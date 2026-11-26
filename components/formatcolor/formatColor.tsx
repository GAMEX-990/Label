// lib/formatColor.tsx

const COLORS: Record<string, string> = {
  "@d7": "bg-amber-700 text-yellow-200 px-1.5 py-0.5 rounded font-bold",
  // ===== กลุ่มสีส้ม / แดง / เบอร์กันดี =====
  "cosmic orange": "text-orange-600 font-bold",
  "คอสมิกออเรนจ์": "text-orange-600 font-bold",
  "orange": "text-orange-500 font-bold",
  "ออเรนจ์": "text-orange-500 font-bold",
  "coral": "text-orange-500 font-bold",
  "burgundy": "text-rose-800 font-bold",
  "เบอร์กันดี": "text-rose-800 font-bold",
  "(product)red": "text-red-600 font-bold",
  "product red": "text-red-600 font-bold",
  "red": "text-red-600 font-bold",
  "แดง": "text-red-600 font-bold",

  // ===== กลุ่มสีชมพู / ม่วง =====
  "soft pink": "text-pink-500 font-bold",
  "ซอฟต์พิงก์": "text-pink-500 font-bold",
  "rose gold": "text-rose-500 font-bold",
  "โรสโกลด์": "text-rose-500 font-bold",
  "pink": "text-pink-500 font-bold",
  "พิงก์": "text-pink-500 font-bold",
  "ชมพู": "text-pink-500 font-bold",
  "deep purple": "text-purple-800 font-bold",
  "ม่วงเข้ม": "text-purple-800 font-bold",
  "lavender": "text-purple-500 font-bold",
  "ลาเวนเดอร์": "text-purple-500 font-bold",
  "purple": "text-purple-600 font-bold",
  "ม่วง": "text-purple-600 font-bold",

  // ===== กลุ่มสีฟ้า / น้ำเงิน / ธารน้ำแข็ง =====
  "ultramarine": "text-indigo-600 font-bold",
  "อัลตร้ามารีน": "text-indigo-600 font-bold",
  "deep blue": "text-blue-800 font-bold",
  "ดีพบลู": "text-blue-800 font-bold",
  "pacific blue": "text-blue-700 font-bold",
  "blue titanium": "text-blue-700 font-bold",
  "glacier blue": "text-sky-600 font-bold",
  "glacier": "text-cyan-600 font-bold",
  "ธารน้ำแข็ง": "text-cyan-600 font-bold",
  "mist blue": "text-sky-600 font-bold",
  "ฟ้าหมอก": "text-sky-600 font-bold",
  "sky blue": "text-sky-500 font-bold",
  "สกายบลู": "text-sky-500 font-bold",
  "sierra blue": "text-sky-600 font-bold",
  "blue": "text-blue-600 font-bold",
  "บลู": "text-blue-600 font-bold",
  "น้ำเงิน": "text-blue-700 font-bold",
  "ฟ้า": "text-sky-600 font-bold",

  // ===== กลุ่มสีเขียว =====
  "midnight green": "text-emerald-900 font-bold",
  "alpine green": "text-emerald-800 font-bold",
  "sprout green": "text-green-600 font-bold",
  "โอคกรีน": "text-emerald-700 font-bold",
  "oak green": "text-emerald-700 font-bold",
  "teal": "text-teal-600 font-bold",
  "เขียวอมฟ้า": "text-teal-600 font-bold",
  "sage": "text-emerald-600 font-bold",
  "เขียวเสจ": "text-emerald-600 font-bold",
  "green": "text-green-600 font-bold",
  "กรีน": "text-green-600 font-bold",
  "เขียว": "text-green-600 font-bold",

  // ===== กลุ่มสีทอง / สตาร์ไลท์ / เหลือง =====
  "desert titanium": "text-amber-700 font-bold",
  "ไทเทเนียมทะเลทราย": "text-amber-700 font-bold",
  "sparkling gold": "text-yellow-600 font-bold",
  "light gold": "text-amber-600 font-bold",
  "ทองอ่อน": "text-amber-600 font-bold",
  "starlight": "text-amber-600 font-bold",
  "สตาร์ไลท์": "text-amber-600 font-bold",
  "สตาไลท์": "text-amber-600 font-bold",
  "gold": "text-yellow-600 font-bold",
  "โกลด์": "text-yellow-600 font-bold",
  "ทอง": "text-yellow-600 font-bold",
  "yellow": "text-yellow-500 font-bold",
  "เหลือง": "text-yellow-500 font-bold",

  // ===== กลุ่มสีเงิน / ขาว / ไทเทเนียม =====
  "natural titanium": "text-stone-600",
  "ไทเทเนียมธรรมชาติ": "text-stone-600",
  "polaris titanium": "text-slate-600",
  "white titanium": "text-zinc-600",
  "ไทเทเนียมขาว": "text-zinc-600",
  "cloud white": "text-slate-600",
  "star white": "text-slate-600",
  "titanium": "text-stone-600 font-bold",
  "ไทเทเนียม": "text-stone-600 font-bold",
  "silver": "text-zinc-600",
  "ซิลเวอร์": "text-zinc-600",
  "เงิน": "text-zinc-600",
  "white": "text-white bg-slate-200 px-1 rounded",
  "White": "text-white bg-slate-200 px-1 rounded",
  "ขาว": "text-white text- bg-slate-200 px-1 rounded",

  // ===== กลุ่มสีดำ / เทาเข้ม =====
  "black titanium": "text-neutral-900 font-bold",
  "ไทเทเนียมดำ": "text-neutral-900 font-bold",
  "space black": "text-neutral-900 font-bold",
  "ดำสเปซแบล็ค": "text-neutral-900 font-bold",
  "space gray": "text-gray-600 font-bold",
  "เทาสเปซเกรย์": "text-gray-600 font-bold",
  "graphite": "text-zinc-700 font-bold",
  "กราไฟต์": "text-zinc-700 font-bold",
  "midnight": "text-slate-800 font-bold",
  "มิดไนท์": "text-slate-800 font-bold",
  "black": "text-neutral-900 font-bold",
  "แบล็ค": "text-neutral-900 font-bold",
  "ดำ": "text-neutral-900 font-bold",
  "gray": "text-gray-600 font-bold",
  "grey": "text-gray-600 font-bold",
  "เทา": "text-gray-600 font-bold",

  // ===== คำยกเว้น (กันตัวตรวจจับไปโดนชื่อรุ่น) =====
  "redmi": "",

  // ===== สีของ Xiaomi & Redmi (เพิ่มต่อจากของเดิมได้เลย) =====
  // กลุ่มสีส้ม / แดง / เหลือง / ทอง
  "sunset orange": "text-orange-600 font-bold",
  "coral orange": "text-orange-500 font-bold",
  "sunrise orange": "text-orange-500 font-bold",
  "blaze orange": "text-orange-600 font-bold",
  "fire red": "text-red-600 font-bold",
  "ruby red": "text-red-700 font-bold",
  "lemon yellow": "text-yellow-500 font-bold",
  "sunny yellow": "text-yellow-500 font-bold",
  "sunrise gold": "text-amber-600 font-bold",
  "champagne gold": "text-yellow-600 font-bold",
  "sand gold": "text-amber-600 font-bold",
  "ซันไรส์โกลด์": "text-amber-600 font-bold",
  "แชมเปญโกลด์": "text-yellow-600 font-bold",
  "แซนด์โกลด์": "text-amber-600 font-bold",

  // กลุ่มสีม่วง / ชมพู
  "lavender purple": "text-purple-500 font-bold",
  "aurora purple": "text-purple-600 font-bold",
  "mist purple": "text-purple-500 font-bold",
  "lilac purple": "text-purple-500 font-bold",
  "violet": "text-violet-600 font-bold",
  "ไวโอเล็ต": "text-violet-600 font-bold",
  "ลาเวนเดอร์เพอร์เพิล": "text-purple-500 font-bold",
  "ออโรร่าเพอร์เพิล": "text-purple-600 font-bold",
  "rose pink": "text-pink-500 font-bold",
  "coral pink": "text-pink-500 font-bold",
  "sunset pink": "text-pink-500 font-bold",
  "pastel pink": "text-pink-400 font-bold",
  "peach pink": "text-rose-400 font-bold",

  // กลุ่มสีฟ้า / น้ำเงิน
  "ocean blue": "text-blue-700 font-bold",
  "midnight blue": "text-blue-900 font-bold",
  "ice blue": "text-sky-500 font-bold",
  "frost blue": "text-sky-500 font-bold",
  "lake blue": "text-sky-600 font-bold",
  "star blue": "text-blue-600 font-bold",
  "pebble blue": "text-blue-600 font-bold",
  "aqua blue": "text-cyan-600 font-bold",
  "sea blue": "text-blue-600 font-bold",
  "titan blue": "text-blue-800 font-bold",
  "lagoon blue": "text-cyan-600 font-bold",
  "โอเชียนบลู": "text-blue-700 font-bold",
  "ไอซ์บลู": "text-sky-500 font-bold",

  // กลุ่มสีเขียว
  "forest green": "text-emerald-800 font-bold",
  "mint green": "text-emerald-500 font-bold",
  "sage green": "text-emerald-600 font-bold",
  "olive green": "text-lime-700 font-bold",
  "aurora green": "text-teal-600 font-bold",
  "pine green": "text-emerald-800 font-bold",
  "jade green": "text-emerald-600 font-bold",
  "clover green": "text-green-600 font-bold",
  "emerald green": "text-emerald-600 font-bold",
  "lime green": "text-lime-600 font-bold",
  "pistachio green": "text-lime-600 font-bold",
  "spruce green": "text-emerald-700 font-bold",
  "ฟอเรสต์กรีน": "text-emerald-800 font-bold",
  "มิ้นต์กรีน": "text-emerald-500 font-bold",
  "เสจกรีน": "text-emerald-600 font-bold",
  "โอลีฟกรีน": "text-lime-700 font-bold",
  "ออโรร่ากรีน": "text-teal-600 font-bold",

  // กลุ่มสีเงิน / ขาว (ใส่พื้นหลังเทาอ่อนให้อ่านง่ายตอนพิมพ์ลงกระดาษขาว)
  "glacier silver": "text-slate-600 font-bold",
  "moonlight silver": "text-zinc-600 font-bold",
  "frosted silver": "text-slate-600 font-bold",
  "titan silver": "text-zinc-600 font-bold",
  "chrome silver": "text-zinc-600 font-bold",
  "liquid silver": "text-slate-600 font-bold",
  "moonlight white": "text-slate-600 font-bold",
  "pearl white": "text-slate-600 font-bold",
  "polar white": "text-slate-600 font-bold",
  "arctic white": "text-slate-600 font-bold",
  "กลาเซียร์ซิลเวอร์": "text-slate-600 font-bold",
  "มูนไลท์ซิลเวอร์": "text-zinc-600 font-bold",
  "มูนไลท์ไวท์": "text-slate-600 font-bold",

  // กลุ่มสีดำ / เทา
  "midnight black": "text-neutral-900 font-bold",
  "matte black": "text-neutral-900 font-bold",
  "obsidian black": "text-neutral-900 font-bold",
  "carbon gray": "text-gray-700 font-bold",
  "graphite gray": "text-zinc-700 font-bold",
  "titan gray": "text-stone-600 font-bold",
  "meteorite gray": "text-gray-700 font-bold",
  "onyx gray": "text-zinc-800 font-bold",
  "mineral gray": "text-gray-600 font-bold",
  "pebble gray": "text-gray-600 font-bold",
  "มิดไนท์แบล็ค": "text-neutral-900 font-bold",
  "คาร์บอนเกรย์": "text-gray-700 font-bold",
  "กราไฟต์เกรย์": "text-zinc-700 font-bold",
  "ไททันเกรย์": "text-stone-600 font-bold",

  // ===== สีของ Vivo (เพิ่มต่อจากรายการเดิมได้เลย) =====

  // กลุ่มสีทอง / ส้ม / แดง / น้ำตาล
  "sunburst gold": "text-amber-600 font-bold",
  "ซันเบิร์สต์โกลด์": "text-amber-600 font-bold",
  "dawn gold": "text-amber-600 font-bold",
  "ดอว์นโกลด์": "text-amber-600 font-bold",
  "starlight gold": "text-amber-600 font-bold",
  "gleaming gold": "text-yellow-600 font-bold",
  "silk gold": "text-yellow-600 font-bold",
  "amber gold": "text-amber-600 font-bold",
  "solar orange": "text-orange-500 font-bold",
  "vibrant orange": "text-orange-600 font-bold",
  "ซันเซ็ตออเรนจ์": "text-orange-600 font-bold",
  "burgundy red": "text-rose-800 font-bold",
  "crimson red": "text-red-700 font-bold",
  "mocha brown": "text-amber-900 font-bold",
  "มอคค่าบราวน์": "text-amber-900 font-bold",
  "espresso brown": "text-amber-950 font-bold",

  // กลุ่มสีม่วง / ชมพู
  "nebula purple": "text-purple-700 font-bold",
  "เนบิวลาเพอร์เพิล": "text-purple-700 font-bold",
  "starry purple": "text-purple-600 font-bold",
  "สตาร์รี่เพอร์เพิล": "text-purple-600 font-bold",
  "orchid purple": "text-purple-500 font-bold",
  "cosmic purple": "text-purple-700 font-bold",
  "mystic purple": "text-purple-700 font-bold",
  "lotus purple": "text-purple-500 font-bold",
  "berry purple": "text-fuchsia-700 font-bold",
  "bloom pink": "text-pink-500 font-bold",
  "บลูมพิงก์": "text-pink-500 font-bold",
  "sakura pink": "text-pink-400 font-bold",
  "ซากุระพิงก์": "text-pink-400 font-bold",
  "pearl pink": "text-pink-400 font-bold",
  "โรสพิงก์": "text-pink-500 font-bold",
  "พีชพิงก์": "text-rose-400 font-bold",

  // กลุ่มสีฟ้า / น้ำเงิน
  "wave blue": "text-blue-600 font-bold",
  "เวฟบลู": "text-blue-600 font-bold",
  "breeze blue": "text-sky-500 font-bold",
  "starry blue": "text-blue-700 font-bold",
  "cosmic blue": "text-blue-800 font-bold",
  "sapphire blue": "text-blue-700 font-bold",
  "peacock blue": "text-cyan-700 font-bold",
  "marine blue": "text-blue-700 font-bold",
  "coastal blue": "text-sky-600 font-bold",
  "crystal blue": "text-sky-500 font-bold",
  "อควาบลู": "text-cyan-600 font-bold",
  "กลาเซียร์บลู": "text-sky-600 font-bold",

  // กลุ่มสีเขียว
  "lotus green": "text-emerald-600 font-bold",
  "โลตัสกรีน": "text-emerald-600 font-bold",
  "breeze green": "text-emerald-500 font-bold",
  "meadow green": "text-green-600 font-bold",
  "oasis green": "text-teal-600 font-bold",
  "matcha green": "text-lime-700 font-bold",
  "wilderness green": "text-emerald-800 font-bold",
  "peacock green": "text-teal-700 font-bold",
  "aqua green": "text-teal-500 font-bold",
  "เอเมอรัลด์กรีน": "text-emerald-600 font-bold",
  "เจดกรีน": "text-emerald-600 font-bold",
  "ไลม์กรีน": "text-lime-600 font-bold",

  // กลุ่มสีเงิน / ขาว / มุก (ใส่พื้นหลังอ่อนให้อ่านชัดบนป้ายขาว)
  "silk white": "text-slate-600 font-bold",
  "ซิลค์ไวท์": "text-slate-600 font-bold",
  "snow white": "text-slate-600 font-bold",
  "diamond white": "text-slate-600 font-bold",
  "glacier white": "text-slate-600 font-bold",
  "dreamy white": "text-slate-600 font-bold",
  "sleek silver": "text-zinc-600 font-bold",
  "สลีคซิลเวอร์": "text-zinc-600 font-bold",
  "starlight silver": "text-zinc-600 font-bold",
  "platinum silver": "text-zinc-600 font-bold",
  "flowing silver": "text-zinc-600 font-bold",
  "aura silver": "text-zinc-600 font-bold",
  "เพิร์ลไวท์": "text-slate-600  font-bold",

  // กลุ่มสีดำ / เทา
  "meteor black": "text-neutral-900 font-bold",
  "เมเทียร์แบล็ค": "text-neutral-900 font-bold",
  "noble black": "text-neutral-900 font-bold",
  "โนเบิลแบล็ค": "text-neutral-900 font-bold",
  "starry black": "text-neutral-900 font-bold",
  "สตาร์รี่แบล็ค": "text-neutral-900 font-bold",
  "cosmic black": "text-neutral-900 font-bold",
  "mystic black": "text-neutral-900 font-bold",
  "volcanic black": "text-neutral-900 font-bold",
  "onyx black": "text-neutral-900 font-bold",
  "agate black": "text-neutral-900 font-bold",
  "diamond black": "text-neutral-900 font-bold",
  "velvet black": "text-neutral-900 font-bold",
  "nebula gray": "text-gray-700 font-bold",
  "slate gray": "text-slate-700 font-bold",
  "storm gray": "text-gray-700 font-bold",
  "metallic gray": "text-zinc-700 font-bold",
  "สเปซแบล็ค": "text-neutral-900 font-bold",
  "ไทเทเนียมเกรย์": "text-stone-600 font-bold",

  // ===== สีของ Samsung Galaxy (เพิ่มต่อจากรายการเดิมได้เลย) =====

  // กลุ่มสีเหลือง / ทอง / ส้ม / บรอนซ์
  "titanium yellow": "text-yellow-600 font-bold",
  "ไทเทเนียมเยลโลว์": "text-yellow-600 font-bold",
  "titanium orange": "text-orange-600 font-bold",
  "ไทเทเนียมออเรนจ์": "text-orange-600 font-bold",
  "amber yellow": "text-amber-500 font-bold",
  "แอมเบอร์เยลโลว์": "text-amber-500 font-bold",
  "awesome lemon": "text-yellow-500 font-bold",
  "ออซัมเลมอน": "text-yellow-500 font-bold",
  "mystic bronze": "text-amber-800 font-bold",
  "bronze": "text-amber-800 font-bold",
  "บรอนซ์": "text-amber-800 font-bold",
  "เยลโลว์": "text-yellow-500 font-bold",

  // กลุ่มสีม่วง / ชมพู
  "titanium pinkgold": "text-rose-500 font-bold",
  "ไทเทเนียมพิงก์โกลด์": "text-rose-500 font-bold",
  "titanium violet": "text-violet-700 font-bold",
  "ไทเทเนียมไวโอเล็ต": "text-violet-700 font-bold",
  "cobalt violet": "text-indigo-700 font-bold",
  "โคบอลต์ไวโอเล็ต": "text-indigo-700 font-bold",
  "awesome violet": "text-violet-600 font-bold",
  "ออซัมไวโอเล็ต": "text-violet-600 font-bold",
  "awesome lilac": "text-purple-400 font-bold",
  "ออซัมไลแลค": "text-purple-400 font-bold",
  "pink gold": "text-rose-500 font-bold",
  "พิงก์โกลด์": "text-rose-500 font-bold",
  "bora purple": "text-purple-600 font-bold",
  "โบราเพอร์เพิล": "text-purple-600 font-bold",
  "peach": "text-orange-400 font-bold",
  "พีช": "text-orange-400 font-bold",

  // กลุ่มสีฟ้า / น้ำเงิน
  "titanium silverblue": "text-sky-700 font-bold",
  "ไทเทเนียมซิลเวอร์บลู": "text-sky-700 font-bold",
  "ไทเทเนียมบลู": "text-blue-700 font-bold",
  "awesome iceblue": "text-sky-500 font-bold",
  "ออซัมไอซี่บลู": "text-sky-500 font-bold",
  "icyblue": "text-sky-500 font-bold",
  "icy blue": "text-sky-500 font-bold",
  "ไอซี่บลู": "text-sky-500 font-bold",
  "awesome navy": "text-blue-900 font-bold",
  "ออซัมเนวี่": "text-blue-900 font-bold",
  "navy": "text-blue-900 font-bold",
  "เนวี่": "text-blue-900 font-bold",
  "blue black": "text-slate-900 font-bold",
  "บลูแบล็ค": "text-slate-900 font-bold",
  "light blue": "text-sky-500 font-bold",

  // กลุ่มสีเขียว / มิ้นต์ / มะนาว
  "titanium jadegreen": "text-emerald-700 font-bold",
  "ไทเทเนียมเจดกรีน": "text-emerald-700 font-bold",
  "titanium green": "text-emerald-700 font-bold",
  "ไทเทเนียมกรีน": "text-emerald-700 font-bold",
  "awesome mint": "text-emerald-500 font-bold",
  "ออซัมมิ้นต์": "text-emerald-500 font-bold",
  "mint": "text-emerald-500 font-bold",
  "มิ้นต์": "text-emerald-500 font-bold",
  "awesome lime": "text-lime-600 font-bold",
  "ออซัมไลม์": "text-lime-600 font-bold",
  "olive": "text-lime-700 font-bold",
  "โอลีฟ": "text-lime-700 font-bold",

  // กลุ่มสีเงิน / ขาว / ครีม (ใส่พื้นหลังอ่อนให้อ่านชัดบนกระดาษขาว)
  "titanium whitesilver": "text-slate-600 font-bold",
  "ไทเทเนียมไวท์ซิลเวอร์": "text-slate-600 font-bold",
  "titanium silver": "text-zinc-600 font-bold",
  "ไทเทเนียมซิลเวอร์": "text-zinc-600 font-bold",
  "silver shadow": "text-zinc-600 font-bold",
  "ซิลเวอร์ชาโดว์": "text-zinc-600 font-bold",
  "awesome silver": "text-zinc-600 font-bold",
  "ออซัมซิลเวอร์": "text-zinc-600 font-bold",
  "awesome white": "text-slate-600 font-bold",
  "ออซัมไวท์": "text-slate-600 font-bold",
  "cream": "text-amber-700 font-bold",
  "ครีม": "text-amber-700 font-bold",

  // กลุ่มสีดำ / เทา
  "titanium jetblack": "text-neutral-900 font-bold",
  "ไทเทเนียมเจ็ตแบล็ค": "text-neutral-900 font-bold",
  "titanium black": "text-neutral-900 font-bold",
  "ไทเทเนียมแบล็ค": "text-neutral-900 font-bold",
  "phantom black": "text-neutral-900 font-bold",
  "แฟนธอมแบล็ค": "text-neutral-900 font-bold",
  "crafted black": "text-neutral-900 font-bold",
  "คราฟเต็ดแบล็ค": "text-neutral-900 font-bold",
  "awesome graphite": "text-zinc-700 font-bold",
  "ออซัมกราไฟต์": "text-zinc-700 font-bold",
  "titanium gray": "text-stone-600 font-bold",
  "moonstone gray": "text-slate-600 font-bold",
  "marble gray": "text-gray-600 font-bold",

  // ===== สีของ Honor (เพิ่มต่อจากรายการเดิมได้เลย) =====

  // กลุ่มสีเขียว / เขียวอมฟ้า
  "สเปราต์กรีน": "text-green-600 font-bold",
  "cyan lake": "text-teal-600 font-bold",
  "ไซแอนเลค": "text-teal-600 font-bold",
  "island teal": "text-teal-600 font-bold",

  // กลุ่มสีส้ม / ทอง / น้ำตาล
  "ซันไรส์ออเรนจ์": "text-orange-600 font-bold",
  "แอมเบอร์โกลด์": "text-amber-600 font-bold",
  "desert gold": "text-amber-700 font-bold",
  "เดเซิร์ตโกลด์": "text-amber-700 font-bold",

  // กลุ่มสีม่วง / ชมพู
  "titanium purple": "text-purple-700 font-bold",
  "ไทเทเนียมเพอร์เพิล": "text-purple-700 font-bold",
  "ไลแลคเพอร์เพิล": "text-purple-500 font-bold",
  "คอรัลพิงก์": "text-pink-500 font-bold",

  // กลุ่มสีฟ้า / น้ำเงิน
  "glaze blue": "text-blue-600 font-bold",
  "เกลซบลู": "text-blue-600 font-bold",

  // กลุ่มสีเงิน / ขาว / มุก (ใส่พื้นหลังอ่อนให้อ่านชัดบนป้ายขาว)
  "frost white": "text-slate-600 font-bold",
  "สตาร์ไลท์ซิลเวอร์": "text-zinc-600 font-bold",

  // กลุ่มสีดำ / เทา
  "เวลเว็ตแบล็ค": "text-neutral-900 font-bold",
  "meteor gray": "text-gray-700 font-bold",

  // ===== สีของ Tecno (เพิ่มต่อจากรายการเดิมได้เลย) =====

  // กลุ่มสีส้ม / ทอง / เหลือง
  "magic skin orange": "text-orange-600 font-bold",
  "เมจิกสกินออเรนจ์": "text-orange-600 font-bold",
  "mecha orange": "text-orange-600 font-bold",
  "เมชาออเรนจ์": "text-orange-600 font-bold",
  "cyber orange": "text-orange-500 font-bold",
  "ไซเบอร์ออเรนจ์": "text-orange-500 font-bold",
  "radiant gold": "text-amber-600 font-bold",
  "เรเดียนท์โกลด์": "text-amber-600 font-bold",

  // กลุ่มสีม่วง / ชมพู
  "dreamy purple": "text-purple-500 font-bold",
  "ดรีมมี่เพอร์เพิล": "text-purple-500 font-bold",
  "neon purple": "text-fuchsia-600 font-bold",
  "นีออนเพอร์เพิล": "text-fuchsia-600 font-bold",
  "blossom pink": "text-pink-500 font-bold",
  "บลอสซัมพิงก์": "text-pink-500 font-bold",

  // กลุ่มสีเขียว / เขียวอมฟ้า
  "emerald glow": "text-emerald-600 font-bold",
  "เอเมอรัลด์โกลว์": "text-emerald-600 font-bold",
  "alps green": "text-emerald-700 font-bold",
  "แอลป์สกรีน": "text-emerald-700 font-bold",
  "cyber green": "text-lime-600 font-bold",
  "ไซเบอร์กรีน": "text-lime-600 font-bold",
  "magic skin green": "text-emerald-600 font-bold",
  "turquoise cyan": "text-teal-600 font-bold",
  "เทอร์ควอยซ์ไซแอน": "text-teal-600 font-bold",
  "island green": "text-teal-600 font-bold",

  // กลุ่มสีฟ้า / น้ำเงิน
  "mecha blue": "text-blue-600 font-bold",
  "เมชาบลู": "text-blue-600 font-bold",
  "atlantis blue": "text-blue-700 font-bold",
  "แอตแลนติสบลู": "text-blue-700 font-bold",
  "ripple blue": "text-sky-600 font-bold",
  "ริปเปิลบลู": "text-sky-600 font-bold",
  "cyber blue": "text-blue-600 font-bold",
  "ไซเบอร์บลู": "text-blue-600 font-bold",
  "electric blue": "text-blue-600 font-bold",
  "magic skin blue": "text-blue-600 font-bold",

  // กลุ่มสีเงิน / ขาว / มุก (ใส่พื้นหลังอ่อนให้อ่านชัดบนป้ายขาว)
  "uyuni salt white": "text-slate-600 font-bold",
  "อูยูนีซอลต์ไวท์": "text-slate-600 font-bold",
  "mystery white": "text-slate-600 font-bold",
  "มิสเตอรี่ไวท์": "text-slate-600 font-bold",
  "magic skin white": "text-slate-600 font-bold",
  "กลาเซียร์ไวท์": "text-slate-600 font-bold",
  "mecha silver": "text-zinc-600 font-bold",
  "เมชาซิลเวอร์": "text-zinc-600 font-bold",
  "starry silver": "text-zinc-600 font-bold",

  // กลุ่มสีดำ / เทา
  "ink black": "text-neutral-900 font-bold",
  "อิงค์แบล็ค": "text-neutral-900 font-bold",
  "mecha black": "text-neutral-900 font-bold",
  "เมชาแบล็ค": "text-neutral-900 font-bold",
  "gravity black": "text-neutral-900 font-bold",
  "กราวิตี้แบล็ค": "text-neutral-900 font-bold",
  "interstellar black": "text-neutral-900 font-bold",
  "อินเตอร์สเตลลาร์แบล็ค": "text-neutral-900 font-bold",
  "comet black": "text-neutral-900 font-bold",
  "lunar black": "text-neutral-900 font-bold",
  "nebula black": "text-neutral-900 font-bold",
  "mystery black": "text-neutral-900 font-bold",
  "magic skin black": "text-neutral-900 font-bold",
  "starfall grey": "text-gray-700 font-bold",
  "starfall gray": "text-gray-700 font-bold",
  "สตาร์ฟอลเกรย์": "text-gray-700 font-bold",
  "titanium grey": "text-stone-600 font-bold",

  // ===== สีของ Infinix (เพิ่มต่อจากรายการเดิมได้เลย) =====

  // กลุ่มสีทอง / ส้ม / แดง
  "titan gold": "text-amber-600 font-bold",
  "ไททันโกลด์": "text-amber-600 font-bold",
  "shiny gold": "text-yellow-600 font-bold",
  "ไชนี่โกลด์": "text-yellow-600 font-bold",
  "สปาร์คกลิ้งโกลด์": "text-yellow-600 font-bold",
  "sunset gold": "text-amber-600 font-bold",
  "crystal gold": "text-yellow-600 font-bold",
  "magic gold": "text-amber-600 font-bold",
  "racing orange": "text-orange-600 font-bold",
  "เรซซิ่งออเรนจ์": "text-orange-600 font-bold",
  "fiery red": "text-red-600 font-bold",

  // กลุ่มสีม่วง / ชมพู
  "fantasy purple": "text-purple-600 font-bold",
  "แฟนตาซีเพอร์เพิล": "text-purple-600 font-bold",

  // กลุ่มสีฟ้า / น้ำเงิน / เขียวอมฟ้า
  "palm blue": "text-blue-600 font-bold",
  "ปาล์มบลู": "text-blue-600 font-bold",
  "horizon blue": "text-sky-600 font-bold",
  "ฮอไรซันบลู": "text-sky-600 font-bold",
  "racing blue": "text-blue-700 font-bold",
  "เรซซิ่งบลู": "text-blue-700 font-bold",
  "sapphire cyan": "text-cyan-600 font-bold",
  "แซฟไฟร์ไซแอน": "text-cyan-600 font-bold",

  // กลุ่มสีเขียว
  "vintage green": "text-emerald-700 font-bold",
  "วินเทจกรีน": "text-emerald-700 font-bold",
  "wave green": "text-teal-600 font-bold",
  "force green": "text-emerald-800 font-bold",

  // กลุ่มสีเงิน / ขาว / ไทเทเนียมสว่าง (ใส่พื้นหลังอ่อนให้อ่านชัดบนป้ายขาว)
  "โพลาริสไทเทเนียม": "text-slate-600 font-bold",
  "neo titanium": "text-slate-600 font-bold",
  "นีโอไทเทเนียม": "text-slate-600 font-bold",
  "chroma silver": "text-zinc-600 font-bold",
  "โครมาซิลเวอร์": "text-zinc-600 font-bold",
  "starlit silver": "text-zinc-600 font-bold",
  "โพลาร์ไวท์": "text-slate-600 font-bold",

  // กลุ่มสีดำ / เทา
  "sleek black": "text-neutral-900 font-bold",
  "สลีคแบล็ค": "text-neutral-900 font-bold",
  "mirror black": "text-neutral-900 font-bold",
  "มิร์เรอร์แบล็ค": "text-neutral-900 font-bold",
  "timber black": "text-neutral-900 font-bold",
  "ทิมเบอร์แบล็ค": "text-neutral-900 font-bold",
  "force black": "text-neutral-900 font-bold",
  "knight black": "text-neutral-900 font-bold",
  "racing black": "text-neutral-900 font-bold",
  "shadow black": "text-neutral-900 font-bold",
  "starfall black": "text-neutral-900 font-bold",
  "ออบซิเดียนแบล็ค": "text-neutral-900 font-bold",
  "submariner gray": "text-slate-700 font-bold",

  // ===== สีของ OPPO (เพิ่มต่อจากรายการเดิมได้เลย) =====

  // กลุ่มสีส้ม / แดง / ทอง / น้ำตาล
  "glow coral": "text-orange-500 font-bold",
  "โกลว์คอรัล": "text-orange-500 font-bold",
  "blossom orange": "text-orange-500 font-bold",
  "บลอสซัมออเรนจ์": "text-orange-500 font-bold",
  "amber orange": "text-amber-600 font-bold",
  "แอมเบอร์ออเรนจ์": "text-amber-600 font-bold",
  "bordeaux red": "text-rose-800 font-bold",
  "บอร์โดเรด": "text-rose-800 font-bold",
  "ซันเซ็ตโกลด์": "text-amber-600 font-bold",
  "aurora gold": "text-yellow-600 font-bold",
  "ออโรร่าโกลด์": "text-yellow-600 font-bold",
  "stone brown": "text-amber-900 font-bold",
  "สโตนบราวน์": "text-amber-900 font-bold",
  "matte brown": "text-amber-950 font-bold",
  "แมทบราวน์": "text-amber-950 font-bold",

  // กลุ่มสีม่วง / ชมพู
  "dream purple": "text-purple-500 font-bold",
  "ดรีมเพอร์เพิล": "text-purple-500 font-bold",
  "twilight purple": "text-indigo-700 font-bold",
  "ทไวไลท์เพอร์เพิล": "text-indigo-700 font-bold",
  "coral purple": "text-purple-500 font-bold",
  "คอรัลเพอร์เพิล": "text-purple-500 font-bold",
  "violet purple": "text-violet-600 font-bold",
  "ไวโอเล็ตเพอร์เพิล": "text-violet-600 font-bold",
  "plum purple": "text-purple-900 font-bold",
  "พลัมเพอร์เพิล": "text-purple-900 font-bold",
  "ซันเซ็ตพิงก์": "text-pink-500 font-bold",

  // กลุ่มสีฟ้า / น้ำเงิน
  "aurora blue": "text-sky-600 font-bold",
  "ออโรร่าบลู": "text-sky-600 font-bold",

  // กลุ่มสีเขียว
  "luminous green": "text-emerald-500 font-bold",
  "ลูมินัสกรีน": "text-emerald-500 font-bold",
  "เวฟกรีน": "text-teal-600 font-bold",

  // กลุ่มสีเงิน / ขาว (ใส่พื้นหลังอ่อนให้อ่านชัดบนป้ายขาว)
  "opal white": "text-slate-600 font-bold",
  "โอปอลไวท์": "text-slate-600 font-bold",
  "pop white": "text-slate-600 font-bold",
  "ป๊อปไวท์": "text-slate-600 font-bold",
  "aurora white": "text-slate-600 font-bold",
  "ออโรร่าไวท์": "text-slate-600 font-bold",
  "luna white": "text-slate-600 font-bold",
  "ลูน่าไวท์": "text-slate-600 font-bold",
  "lunar white": "text-slate-600 font-bold",
  "ลูนาร์ไวท์": "text-slate-600 font-bold",
  "ceramic white": "text-slate-600 font-bold",
  "เซรามิกไวท์": "text-slate-600 font-bold",
  "astro silver": "text-zinc-600 font-bold",
  "แอสโตรซิลเวอร์": "text-zinc-600 font-bold",
  "nebula silver": "text-zinc-600 font-bold",
  "เนบิวล่าซิลเวอร์": "text-zinc-600 font-bold",
  "silver gleam": "text-zinc-600 font-bold",
  "ซิลเวอร์กลีม": "text-zinc-600 font-bold",

  // กลุ่มสีดำ / เทา
  "starlight black": "text-neutral-900 font-bold",
  "สตาร์ไลท์แบล็ค": "text-neutral-900 font-bold",
  "เนบิวล่าแบล็ค": "text-neutral-900 font-bold",
  "titanium charcoal": "text-zinc-800 font-bold",
  "ไทเทเนียมชาร์โคล": "text-zinc-800 font-bold",
  "stellar titanium": "text-stone-600 font-bold",
  "สเตลลาร์ไทเทเนียม": "text-stone-600 font-bold",
  "midnight grey": "text-gray-800 font-bold",
  "midnight gray": "text-gray-800 font-bold",
  "มิดไนท์เกรย์": "text-gray-800 font-bold",
  "silver grey": "text-gray-600 font-bold",
  "ซิลเวอร์เกรย์": "text-gray-600 font-bold",

  // ===== สีของ realme (เพิ่มต่อจากรายการเดิมได้เลย) =====

  // กลุ่มสีทอง / ส้ม / เหลือง / เบจ
  "monet gold": "text-amber-600 font-bold",
  "โมเนต์โกลด์": "text-amber-600 font-bold",
  "champion gold": "text-yellow-600 font-bold",
  "แชมเปียนโกลด์": "text-yellow-600 font-bold",
  "mighty gold": "text-amber-600 font-bold",
  "ไมตี้โกลด์": "text-amber-600 font-bold",
  "sparkle gold": "text-yellow-600 font-bold",
  "สปาร์คเคิลโกลด์": "text-yellow-600 font-bold",
  "velvet gold": "text-amber-700 font-bold",
  "เวลเว็ตโกลด์": "text-amber-700 font-bold",
  "glowing gold": "text-yellow-600 font-bold",
  "โกลว์อิ้งโกลด์": "text-yellow-600 font-bold",
  "sunlight gold": "text-amber-500 font-bold",
  "ซันไลท์โกลด์": "text-amber-500 font-bold",
  "navigator beige": "text-amber-700 bg-amber-50 px-1 rounded font-bold",
  "เนวิเกเตอร์เบจ": "text-amber-700 bg-amber-50 px-1 rounded font-bold",
  "cyber yellow": "text-yellow-500 font-bold",

  // กลุ่มสีม่วง / ชมพู
  "monet purple": "text-purple-600 font-bold",
  "โมเนต์เพอร์เพิล": "text-purple-600 font-bold",

  // กลุ่มสีฟ้า / น้ำเงิน
  "submarine blue": "text-blue-800 font-bold",
  "ซับมารีนบลู": "text-blue-800 font-bold",
  "voyager blue": "text-blue-700 font-bold",
  "วอยเอเจอร์บลู": "text-blue-700 font-bold",
  "twilight blue": "text-indigo-700 font-bold",
  "ทไวไลท์บลู": "text-indigo-700 font-bold",
  "starlight blue": "text-sky-600 font-bold",
  "สตาร์ไลท์บลู": "text-sky-600 font-bold",
  "speed blue": "text-blue-600 font-bold",
  "flowing blue": "text-sky-500 font-bold",
  "navy blue": "text-blue-900 font-bold",
  "เนวี่บลู": "text-blue-900 font-bold",
  "เลคบลู": "text-sky-600 font-bold",

  // กลุ่มสีเขียว
  "pioneer green": "text-emerald-800 font-bold",
  "ไพโอเนียร์กรีน": "text-emerald-800 font-bold",
  "โอเอซิสกรีน": "text-teal-600 font-bold",
  "rain forest": "text-emerald-800 font-bold",
  "เรนฟอเรสต์": "text-emerald-800 font-bold",
  "dark green": "text-emerald-900 font-bold",
  "ดาร์กกรีน": "text-emerald-900 font-bold",
  "woodland green": "text-emerald-800 font-bold",
  "feather green": "text-emerald-500 font-bold",
  "glowing green": "text-green-600 font-bold",

  // กลุ่มสีเงิน / ขาว (ใส่พื้นหลังอ่อนให้อ่านชัดบนป้ายขาว)
  "fluid silver": "text-zinc-600 font-bold",
  "ฟลูอิดซิลเวอร์": "text-zinc-600 font-bold",
  "razor silver": "text-slate-600 font-bold",
  "เรเซอร์ซิลเวอร์": "text-slate-600 font-bold",
  "astral silver": "text-zinc-600 font-bold",
  "แอสทรัลซิลเวอร์": "text-zinc-600 font-bold",
  "glory silver": "text-zinc-600 font-bold",
  "กลอรี่ซิลเวอร์": "text-zinc-600 font-bold",
  "glory white": "text-slate-600 font-bold",
  "กลอรี่ไวท์": "text-slate-600 font-bold",
  "marble white": "text-slate-600 font-bold",

  // กลุ่มสีดำ / เทา
  "dark matter": "text-neutral-900 font-bold",
  "ดาร์กแมทเทอร์": "text-neutral-900 font-bold",
  "razor black": "text-neutral-900 font-bold",
  "เรเซอร์แบล็ค": "text-neutral-900 font-bold",
  "carbon black": "text-neutral-900 font-bold",
  "คาร์บอนแบล็ค": "text-neutral-900 font-bold",
  "speed black": "text-neutral-900 font-bold",
  "สปีดแบล็ค": "text-neutral-900 font-bold",
  "mighty black": "text-neutral-900 font-bold",
  "ไมตี้แบล็ค": "text-neutral-900 font-bold",
  "rock black": "text-neutral-900 font-bold",
  "ร็อกแบล็ค": "text-neutral-900 font-bold",
  "steel black": "text-zinc-800 font-bold",

  // ===== คำยกเว้น (กันตัวตรวจจับไปโดนชื่อรุ่น RedMagic) =====
  "redmagic": "",
  "red magic": "",

  // ===== สีของ ZTE / nubia / RedMagic (เพิ่มต่อจากรายการเดิมได้เลย) =====

  // กลุ่มสีทอง / เหลือง / ส้ม
  "ไซเบอร์เยลโลว์": "text-yellow-500 font-bold",
  "zealous orange": "text-orange-600 font-bold",
  "ซีลัสออเรนจ์": "text-orange-600 font-bold",

  // กลุ่มสีฟ้า / น้ำเงิน
  "water blue": "text-sky-500 font-bold",
  "วอเตอร์บลู": "text-sky-500 font-bold",

  // กลุ่มสีเงิน / ขาว (ใส่พื้นหลังอ่อนให้อ่านชัดบนป้ายขาว)
  "frost silver": "text-slate-600 font-bold",
  "ฟรอสต์ซิลเวอร์": "text-slate-600 font-bold",
  "snowfall": "text-slate-600 font-bold",
  "สโนว์ฟอล": "text-slate-600 font-bold",
  "starlight white": "text-slate-600 font-bold",
  "สตาร์ไลท์ไวท์": "text-slate-600 font-bold",
  "ivory white": "text-amber-800 font-bold",
  "ไอวอรี่ไวท์": "text-amber-800 font-bold",

  // กลุ่มสีดำ / เทา
  "dark knight": "text-neutral-900 font-bold",
  "ดาร์กไนท์": "text-neutral-900 font-bold",
  "shadow": "text-zinc-800 font-bold",
  "ชาโดว์": "text-zinc-800 font-bold",
  "sleet": "text-slate-700 font-bold",
  "สลีต": "text-slate-700 font-bold",
  "cyclone": "text-zinc-800 font-bold",
  "ไซโคลน": "text-zinc-800 font-bold",
  "metal gray": "text-gray-700 font-bold",
  "เมทัลเกรย์": "text-gray-700 font-bold",
};

// เรียงจากคำยาวไปสั้นอัตโนมัติ และ Escape อักขระพิเศษอย่างวงเล็บ ()
const sortedWords = Object.keys(COLORS)
  .sort((a, b) => b.length - a.length)
  .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

const pattern = new RegExp(`(${sortedWords.join("|")})`, "gi");

export function formatColor(text: string) {
  if (!text) return text;

  const parts = text.split(pattern);

  return parts.map((word, index) => {
    const colorClass = COLORS[word.toLowerCase()];
    return colorClass ? (
      <span key={index} className={colorClass}>
        {word}
      </span>
    ) : (
      word
    );
  });
}