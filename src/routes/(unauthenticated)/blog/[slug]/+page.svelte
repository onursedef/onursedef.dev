<script lang="ts">
	import { marked } from 'marked';
	import PlaceholderImage from '../../../../assets/images/placeholder-1.jpg';
	import Potrait from '../../../../assets/images/potrait.jpg';
	import { Eye, Tag } from 'lucide-svelte';

	let postContent = `<h1 id="sample-markdown">Sample Markdown</h1>
<p>This is some basic, sample markdown.</p>
<h2 id="second-heading">Second Heading</h2>
<ul>
<li>Unordered lists, and:<ol>
<li>One</li>
<li>Two</li>
<li>Three</li>
</ol>
</li>
<li>More</li>
</ul>
<blockquote>
<p>Blockquote</p>
</blockquote>
<p>And <strong>bold</strong>, <em>italics</em>, and even <em>italics and later <strong>bold</strong></em>. Even <del>strikethrough</del>. <a href="https://markdowntohtml.com">A link</a> to somewhere.</p>
<p>And code highlighting:</p>
<pre><code class="lang-js"><span class="hljs-keyword">var</span> foo = <span class="hljs-string">'bar'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">baz</span><span class="hljs-params">(s)</span> </span>{
   <span class="hljs-keyword">return</span> foo + <span class="hljs-string">':'</span> + s;
}
</code></pre>
<p>Or inline code like <code>var foo = &#39;bar&#39;;</code>.</p>
<p>Or an image of bears</p>
<p><img src="http://placebear.com/200/200" alt="bears"></p>
<p>The end ...</p>`;

	let secondPostContent = `## **1. Şüphe ve Gizlilik Mekanikleri**

### 1.1 Şüphe Barları

- **Tanım**: NPC’lerin karakteri gördüğünde tepki seviyelerine göre şüphe barı dolacaktır.
- **Detaylar**:
    - NPC şüphe barı **Yeşil** seviyede olduğunda karaktere bakıp işine devam eder.
    - **Turuncu** seviyede karakterin şüpheli olduğunu düşünerek amirine rapor verir.
    - **Kırmızı** seviyede bağırarak uyarır ve tüm kapılar kilitlenir. Güvenlik birimleri, karakterin son görüldüğü bölgeye gönderilir.
- **Ekstra**: Karakter düşük profilde hareket ederse, şüphe barı daha yavaş dolabilir.

### 1.2 Kamuflaj ve Çevre Kullanımı

- **Tanım**: Çevredeki nesneler karakterin saklanması için kullanılabilir.
- **Detaylar**:
    - **Mobilyalar, perde arkası veya köşeler** gibi alanlarda karakter geçici olarak saklanabilir.
- **Ekstra**: Karakterin düşük profilde hareket etmesi, NPC'lerin dikkatini daha az çeker.

### 1.3 Ortam Gürültüsü ve Eylemler

- **Tanım**: Karakterin çevredeki seslere duyarlılığı NPC’lerin tetikte olmasını etkiler.
- **Detaylar**:
    - Yüksek ses çıkaran eylemler (koşmak, zemin üzerinde hızla ilerlemek) NPC’lerin dikkatini çeker ve şüphe barı hızla dolar.

## **2. Hedef Odalara Erişim ve Hacking Mekanikleri**

### 2.1 Hacking Mini Oyunu

- **Tanım**: Sunucu odası veya kilitli kapıları açmak için bir mini oyun eklenir.
- **Detaylar**:
    - Bulmaca veya zamanlamaya dayalı bir mekanik uygulanabilir. Başarılı bir hackleme, kapıyı veya güvenlik sistemini geçici olarak devre dışı bırakır.

### 2.2 Güvenlik Kameraları ve İzleme

- **Tanım**: Güvenlik kameraları, koridorlarda karakterin geçişini gözlemler.
- **Detaylar**:
    - Kameralara yakalanmamak için karakter saklanabilir veya güvenlik sistemini hackleyerek kameraları geçici olarak kör edebilir.

## **3. Kaçış ve Yakalanma Durumları**

### 3.1 Alternatif Kaçış Yolları

- **Tanım**: Karakter yakalanma riski altındaysa, alternatif kaçış yollarını kullanabilir.
- **Detaylar**:
    - **Pencereler, havalandırma delikleri veya gizli geçitler** kaçış için kullanılabilir.

### 3.2 Kapatılabilir Işıklar veya Kör Edici Araçlar

- **Tanım**: Kaçış sırasında kullanılabilecek ışık kapama veya NPC'leri kör eden araçlar.
- **Detaylar**:
    - NPC'lerin görüş alanını sınırlayan geçici etkiler, kaçışta avantaj sağlar.

### 3.3 Zaman Kısıtlı Kaçış

- **Tanım**: NPC'lerin alarma geçmesi durumunda, kaçış için bir zaman kısıtı tanımlanır.
- **Detaylar**:
    - Kapıların kilitlenme süresi başlamadan karakterin kaçması gerekir.

## **4. NPC Tepkileri ve Katmanlı Güvenlik**

### 4.1 NPC Zekası ve Görev Dağılımı

- **Tanım**: NPC'ler, rollerine göre farklı rutinlerde davranış gösterir.
- **Detaylar**:
    - **Güvenlik görevlileri** devriye gezerek yüksek dikkat seviyesine sahiptir.
    - Sıradan çalışanlar, şüpheli bir durum oluşana kadar rutin işlerine devam eder.

### 4.2 Katmanlı Güvenlik Bölgeleri

- **Tanım**: Yasaklı bölge konsepti katmanlandırılarak, farklı risk seviyelerine göre güvenlik düzenlenir.
- **Detaylar**:
    - **Düşük, Orta ve Yüksek Riskli Bölgeler** ile oyuncunun her bir bölgeye farklı bir stratejiyle yaklaşması beklenir.

## **5. İlerlemeyi Destekleyen Ekipmanlar**

### 5.1 Kilit Açma Araçları

- **Tanım**: Karakter kilitli alanlara erişim sağlamak için ekipman taşır.
- **Detaylar**:
    - **Hacking cihazları veya kilit açıcı aletler** ile belirli kapıları geçici olarak devre dışı bırakabilir.

### 5.2 Dinleme Cihazları ve Mikrofonlar

- **Tanım**: Yüksek rütbelilerin konuşmalarını dinlemek için dinleme cihazları kullanılır.
- **Detaylar**:
    - Karakter, böcek yerleştirip konuşmaları uzaktan dinleyebilir.

## **6. Dinamik Görevler ve Beklenmeyen Durumlar**

### 6.1 Dinamik Görev İçerisinde Durumlar

- **Tanım**: Görev sırasında beklenmedik durumlar ortaya çıkabilir.
- **Detaylar**:
    - Elektrik kesintisi veya yangın alarmı gibi olaylar karakterin yeni bir plan yapmasını gerektirir.

### 6.2 Gizli Bilgiler İçin Zorluk Seviyesi

- **Tanım**: Görevlerin bilgi güvenliği seviyeleri, erişim zorluklarını belirler.
- **Detaylar**:
    - Sunuculardan alınan yüksek güvenlikli veriler, daha karmaşık hackleme gerektirebilir.`;
</script>

<div class="flex flex-col gap-3">
	<div class="flex flex-col gap-2">
		<a href="/blog?category=technology" class="text-gray-600 dark:text-gray-300">Technology</a>
		<h1 class="text-3xl font-bold">Mekanikler</h1>
		<div class="flex flex-col gap-3">
			<div class="flex gap-2 text-sm">
				<img src={Potrait} alt="Potrait" class="h-16 w-16 rounded-full object-cover" />
				<div class="flex flex-col justify-between">
					<span class="font-semibold">Onur Sedef</span>
					<span class="text-xs text-gray-600 dark:text-gray-300">May 20, 2021</span>
					<span class="text-xs text-gray-600 dark:text-gray-300">5 min read</span>
				</div>
			</div>
			<div class="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
				<div class="inline-flex items-center gap-2">
					<Tag class="h-3 w-3" /> technology, sound
				</div>
				<div class="inline-flex items-center gap-2">
					<Eye class="h-3 w-3" /> 4321
				</div>
			</div>
		</div>
	</div>
	<div class="flex flex-col gap-2">
		<img
			src={PlaceholderImage}
			alt="Placeholder"
			class=" aspect-[16/9] w-full rounded-lg object-cover"
		/>
		<div class="inline-flex items-center justify-between overflow-x-auto">
			<img
				src={PlaceholderImage}
				alt="Placeholder"
				class="aspect-[16/9] h-[5.2rem] flex-shrink-0 rounded-md object-cover"
			/>
			<img
				src={PlaceholderImage}
				alt="Placeholder"
				class="aspect-[16/9] h-[5.2rem] flex-shrink-0 rounded-md object-cover"
			/>
			<img
				src={PlaceholderImage}
				alt="Placeholder"
				class="aspect-[16/9] h-[5.2rem] flex-shrink-0 rounded-md object-cover"
			/>
			<img
				src={PlaceholderImage}
				alt="Placeholder"
				class="aspect-[16/9] h-[5.2rem] flex-shrink-0 rounded-md object-cover"
			/>
			<img
				src={PlaceholderImage}
				alt="Placeholder"
				class="aspect-[16/9] h-[5.2rem] flex-shrink-0 rounded-md object-cover"
			/>
		</div>
	</div>
	<div
		class="prose leading-tight dark:text-white dark:prose-headings:text-white dark:prose-strong:text-white"
	>
		{@html marked(secondPostContent)}
	</div>
</div>
