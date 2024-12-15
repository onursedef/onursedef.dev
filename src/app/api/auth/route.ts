import { Login } from "@/lib/types/Login";

export async function POST(request: Request) {
    const username = process.env.ADMIN_USERNAME;
    const password = process.env.ADMIN_PASSWORD;
    const api_endpoint = process.env.API_ENDPOINT;

    if (!username || !password) {
        console.error("Missing ADMIN_USERNAME or ADMIN_PASSWORD");
        return new Response("Internal Server Error", { status: 500 });
    }

    const query = `mutation {
  login( input: {
    clientMutationId: "uniqueId",
    username: "${username}",
    password: "${password}"
  } ) {
    authToken
    user {
        id
        name
    }
  }
}`

    var apiReq = await fetch(api_endpoint as string, {
        method: "POST",
        body: JSON.stringify({ query }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!apiReq.ok) {
        const text = await apiReq.text();
        console.error(`API Error [${apiReq.status}]:`, text);
        return new Response("Internal Server Error", { status: 500 });
    }

    let apiRes;

    try {
        apiRes = await apiReq.json();
    } catch (err) {
        const text = await apiReq.text();
        console.error("API response was not JSON:", text);
        return new Response("Internal Server Error", { status: 500 });
    }

    if (apiRes.errors) {
        console.error("API Error:", apiRes.errors);
        return new Response("Internal Server Error", { status: 500 });
    }

    var data: Login = {
        authToken: apiRes.data.login.authToken,
        user: apiRes.data.login.user
    }

    return new Response(JSON.stringify(data), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}