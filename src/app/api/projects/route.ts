import { Projects } from "@/lib/types/Project";

export async function GET(request: Request) {
    const apiEndpoint = process.env.API_ENDPOINT;
    const apiKey = await fetch('http://localhost:3000/api/auth', {
        method: 'POST'
    }).then(res => res.json()).then(data => data.authToken);

    const query = `
    query {
  projects {
    nodes {
      author {
        node {
          firstName
          lastName
          avatar {
            url
          }
        }
      }
      excerpt
      title
      featuredImage {
        node {
          altText
          sourceUrl
        }
      }
      githubUrls(first: 1) {
          nodes {
            name
        	}
      }
      websiteUrls(first: 1) {
        nodes {
          name
        }
      }
    }
  }
}`

    const apiReq = await fetch(apiEndpoint as string, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ query })
    });

    if (!apiReq.ok && apiReq.status !== 403) {
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

    var projects: Projects = {
        projects: []
    };

    for (let project of apiRes.data.projects.nodes) {
        projects.projects.push({
            title: project.title,
            description: project.excerpt,
            githubUrl: project.githubUrls.length > 0 ? project.githubUrls[0].name : '',
            websiteUrl: project.websiteUrls.length > 0 ? project.websiteUrls[0].name : '',
            author: {
                firstName: project.author.node.firstName,
                lastName: project.author.node.lastName,
                avatarUrl: project.author.node.avatar.url
            },
            featuredImage: {
                altText: project.featuredImage.node.altText,
                sourceUrl: project.featuredImage.node.sourceUrl
            }
        })
    }

    return new Response(JSON.stringify(projects), {
        headers: {
            "Content-Type": "application/json"
        }
    });
}