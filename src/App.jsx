import { useState } from "react";

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  ocean:      "#1B5E7B",   // deep teal — primary
  oceanMid:   "#2C8FAD",
  oceanLight: "#E3F4FA",
  seafoam:    "#D6EFE8",
  algae:      "#3DAA7A",   // protein-green accent
  sand:       "#F7F5F0",
  white:      "#FFFFFF",
  ink:        "#1A1F1E",
  slate:      "#536065",
  border:     "#DCE8EC",
  // tag colors
  tProBg:    "#D4EDE4",  tProTx: "#1A6644",
  tFibBg:    "#D6EDF7",  tFibTx: "#0C4A6B",
  tEasyBg:   "#FEF3DC",  tEasyTx: "#7A5500",
  tVegBg:    "#E8F5E2",  tVegTx: "#2F6B1A",
  tFishBg:   "#E0ECF8",  tFishTx: "#1A3F6B",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const WEEK1 = [
  {
    day: "Sunday", date: "Day 1", theme: "Kickoff",
    morning: {
      meal: "Green Power Smoothie",
      desc: "Blend: 1 cup frozen spinach, 1 frozen banana, 1 scoop vanilla protein powder, 1 tbsp almond butter, 1 cup unsweetened almond milk, 1 tsp matcha. ~35g protein. Pour and go.",
      prep: "3 min", tags: ["protein","fiber","easy"],
    },
    lunch: {
      meal: "White Bean & Avocado Smash Wrap",
      desc: "Mash canned white beans with half an avocado, lemon, salt, red pepper flakes. Spread in a whole wheat tortilla with arugula and sliced cucumber.",
      prep: "5 min", tags: ["protein","fiber"],
    },
    dinner: {
      meal: "Honey Garlic Salmon + Roasted Sweet Potato + Broccolini",
      desc: "Salmon fillet glazed with honey, garlic, and tamari. Sweet potato wedges and broccolini on the same sheet pan at 425°F for 25 min. Simple and deeply satisfying.",
      prep: "30 min", tags: ["protein","fish"],
    },
    notes: "Boil 6 eggs tonight — they'll carry you through the week.",
  },
  {
    day: "Monday", date: "Day 2", theme: "Fuel Up",
    morning: {
      meal: "Triple Berry Protein Shake",
      desc: "Blend: 1 cup frozen mixed berries, 1 scoop unflavored or vanilla protein, 1 cup Greek yogurt (plain), 1 tbsp chia seeds, ½ cup water or milk. ~40g protein. Thick and filling.",
      prep: "3 min", tags: ["protein","fiber","easy"],
    },
    lunch: {
      meal: "Chickpea Mason Jar Salad",
      desc: "Layer from bottom: lemon-tahini dressing, chickpeas, cherry tomatoes, cucumber, roasted red pepper, feta, romaine on top. Shake and eat.",
      prep: "5 min", tags: ["protein","fiber","veg"],
    },
    dinner: {
      meal: "Miso-Glazed Cod + Edamame Slaw + Brown Rice",
      desc: "Cod fillets coated in white miso, honey, and rice vinegar — broil 10 min. Slaw: shredded cabbage, shelled edamame, sesame oil, rice vinegar, sesame seeds. Serve over brown rice.",
      prep: "25 min", tags: ["protein","fiber","fish"],
    },
    notes: "Make overnight oats tonight for Tuesday morning.",
  },
  {
    day: "Tuesday", date: "Day 3", theme: "Steady",
    morning: {
      meal: "Peanut Butter Banana Protein Shake",
      desc: "Blend: 1 frozen banana, 2 tbsp PB, 1 scoop chocolate or vanilla protein, 1 tbsp ground flax, 1 cup oat milk. ~35g protein. Tastes like dessert, fuels like a meal.",
      prep: "3 min", tags: ["protein","fiber","easy"],
    },
    lunch: {
      meal: "Edamame & Brown Rice Bowl",
      desc: "Brown rice (precooked) + shelled edamame + shredded carrots + sliced avocado + drizzle of tamari and sesame oil. Top with everything bagel seasoning.",
      prep: "4 min", tags: ["protein","fiber","veg"],
    },
    dinner: {
      meal: "Spicy Shrimp Tacos with Cabbage Slaw + Lime Crema",
      desc: "Shrimp tossed in chili, cumin, garlic — sauté 4 min. Corn tortillas, shredded purple cabbage, lime crema (Greek yogurt + lime juice). Fast, vibrant, and high protein.",
      prep: "20 min", tags: ["protein","fish"],
    },
    notes: "Cook extra brown rice tonight — saves you Wednesday lunch.",
  },
  {
    day: "Wednesday", date: "Day 4", theme: "Halfway",
    morning: {
      meal: "Tropical Greens Smoothie",
      desc: "Blend: 1 cup frozen mango, ½ cup frozen pineapple, 1 cup baby spinach, 1 scoop vanilla protein, 1 tbsp hemp seeds, 1 cup coconut water. Sunshine in a glass.",
      prep: "3 min", tags: ["protein","fiber","easy"],
    },
    lunch: {
      meal: "Leftover Rice Bowl Remix",
      desc: "Tuesday's rice + 1 can black beans (rinsed) + salsa + a handful of cheddar or feta. Microwave 90 sec. Add hot sauce. Done.",
      prep: "2 min", tags: ["protein","fiber","veg"],
    },
    dinner: {
      meal: "Lemon Herb Salmon + Quinoa + Sautéed Spinach",
      desc: "Salmon baked with olive oil, lemon zest, fresh dill, and capers at 400°F for 15 min. Sauté a big pile of baby spinach with garlic. Serve over fluffy quinoa.",
      prep: "25 min", tags: ["protein","fish","fiber"],
    },
    notes: "Thursday grocery run — check the list before you go.",
  },
];

const WEEK1_THURS = [
  {
    day: "Thursday", date: "Day 5", theme: "Second Wind",
    morning: {
      meal: "Chocolate Greens Protein Shake",
      desc: "Blend: 1 cup frozen spinach, 1 tbsp cocoa powder, 1 scoop chocolate protein, 1 tbsp almond butter, 1 cup oat milk, a few ice cubes. Dark and rich — like a healthy Frosty.",
      prep: "3 min", tags: ["protein","fiber","easy"],
    },
    lunch: {
      meal: "Tuna & White Bean Lettuce Cups",
      desc: "Mix canned albacore tuna + canned white beans + capers + lemon juice + olive oil + dijon. Scoop into romaine leaves. Eat like tacos.",
      prep: "5 min", tags: ["protein","fish"],
    },
    dinner: {
      meal: "Black Bean & Sweet Potato Enchilada Bowls",
      desc: "Roast sweet potato cubes with chili powder. Layer over brown rice with black beans, enchilada sauce, shredded cheddar, and Greek yogurt crema. Bold, filling, plant-powered.",
      prep: "35 min", tags: ["protein","fiber","veg"],
    },
    notes: "Soak lentils overnight if making Friday's soup.",
  },
  {
    day: "Friday", date: "Day 6", theme: "Strong Finish",
    morning: {
      meal: "Blueberry Flax Protein Smoothie",
      desc: "Blend: 1 cup frozen blueberries, 1 cup plain Greek yogurt, 1 tbsp ground flax, 1 tsp honey, ½ cup almond milk. ~30g protein from the yogurt alone. No powder needed.",
      prep: "3 min", tags: ["protein","fiber","easy"],
    },
    lunch: {
      meal: "Hard-Boiled Egg & Avocado Box",
      desc: "2 hard-boiled eggs + half an avocado (lemon + flaky salt) + cherry tomatoes + whole grain crackers. Pack in a bento box, eat anywhere.",
      prep: "2 min", tags: ["protein","veg","easy"],
    },
    dinner: {
      meal: "Ahi Tuna Steak + Sesame Edamame + Miso Soup",
      desc: "Ahi seared in a very hot pan: 90 sec per side. Rest, slice against the grain. Sesame edamame (shelled + sesame oil + salt). Quick miso soup from paste. A restaurant Friday at home.",
      prep: "20 min", tags: ["protein","fish"],
    },
    notes: "You made it through Week 1. Plan something fun for Saturday.",
  },
  {
    day: "Saturday", date: "Day 7", theme: "Weekend",
    morning: {
      meal: "Slow Morning Smoothie Bowl",
      desc: "Extra-thick blend of frozen acai packet, frozen banana, protein powder, and almond milk. Pour into a bowl, top with granola, sliced banana, hemp seeds, and a drizzle of almond butter. A real morning.",
      prep: "8 min", tags: ["protein","fiber"],
    },
    lunch: {
      meal: "Big Feta & Chickpea Greek Salad",
      desc: "Romaine, kalamata olives, cucumber, cherry tomatoes, red onion, a generous block of feta broken in, chickpeas. Olive oil + red wine vinegar + oregano dressing.",
      prep: "8 min", tags: ["protein","fiber","veg"],
    },
    dinner: {
      meal: "Whole Roasted Branzino + Herb Oil + Roasted Fennel",
      desc: "Whole fish stuffed with lemon slices and fresh herbs, roasted at 425°F for 20 min. Fennel bulb quartered and roasted alongside. Finish with a bright herb oil (parsley, mint, olive oil). A showstopper.",
      prep: "35 min", tags: ["protein","fish"],
    },
    notes: "Week 2 starts tomorrow — prep your Sunday grocery list tonight.",
  },
];

const WEEK2 = [
  {
    day: "Sunday", date: "Day 8", theme: "Week 2 Begin",
    morning: {
      meal: "Matcha Almond Protein Shake",
      desc: "Blend: 1 tsp matcha, 1 scoop vanilla protein, 1 tbsp almond butter, 1 cup almond milk, ½ frozen banana, handful of ice. Clean energy, no crash.",
      prep: "3 min", tags: ["protein","easy"],
    },
    lunch: {
      meal: "White Bean & Kale Soup (batch cook)",
      desc: "Big pot: olive oil, garlic, canned white beans, vegetable broth, kale, diced tomatoes, Italian seasoning, lemon. Simmer 20 min. Eat now and all week.",
      prep: "25 min", tags: ["protein","fiber","veg"],
    },
    dinner: {
      meal: "Teriyaki Salmon Bowl + Bok Choy + Brown Rice",
      desc: "Salmon glazed with soy, mirin, honey. Stir-fry bok choy with garlic. Brown rice base. Top with sesame seeds and pickled ginger. A bowl you'll look forward to all day.",
      prep: "30 min", tags: ["protein","fish"],
    },
    notes: "Hard-boil 6 eggs and prep Tuesday's overnight oats tonight.",
  },
  {
    day: "Monday", date: "Day 9", theme: "Locked In",
    morning: {
      meal: "Strawberry Basil Protein Smoothie",
      desc: "Blend: 1 cup frozen strawberries, 3–4 fresh basil leaves, 1 scoop vanilla protein, 1 cup Greek yogurt, ½ cup almond milk. Unexpected and incredible. ~38g protein.",
      prep: "3 min", tags: ["protein","fiber","easy"],
    },
    lunch: {
      meal: "White Bean Soup (from Sunday)",
      desc: "Thermos or microwave. Add a drizzle of olive oil and parmesan on top if you want. Soup gets better on day 2.",
      prep: "0 min", tags: ["protein","fiber","veg"],
    },
    dinner: {
      meal: "Stuffed Bell Peppers with Lentils & Feta",
      desc: "Halved bell peppers filled with cooked green lentils, diced tomatoes, cumin, smoked paprika, crumbled feta. Baked at 375°F for 30 min. High protein, deeply savory, zero meat.",
      prep: "40 min", tags: ["protein","fiber","veg"],
    },
    notes: "Make extra lentil filling — it'll be Tuesday's lunch bowl.",
  },
  {
    day: "Tuesday", date: "Day 10", theme: "Dialed",
    morning: {
      meal: "Overnight Protein Oat Shake",
      desc: "The night before: blend ¼ cup rolled oats, 1 scoop protein, 1 tbsp PB, 1 cup oat milk, ½ banana. Refrigerate. Shake in the morning and drink. Zero morning effort.",
      prep: "0 min", tags: ["protein","fiber","easy"],
    },
    lunch: {
      meal: "Lentil Bowl (Leftover)",
      desc: "Stuffed pepper filling over a bed of arugula with a squeeze of lemon. Add a sprinkle of feta. No reheating needed.",
      prep: "2 min", tags: ["protein","fiber","veg"],
    },
    dinner: {
      meal: "Garlic Butter Shrimp over Chickpea Pasta",
      desc: "Shrimp in garlic, butter, white wine, lemon. Served over chickpea pasta (way more protein than regular pasta). Finish with parmesan and parsley. 20 min total, feels indulgent.",
      prep: "20 min", tags: ["protein","fish"],
    },
    notes: "Cook extra shrimp for Wednesday if you want a quick lunch option.",
  },
  {
    day: "Wednesday", date: "Day 11", theme: "Fiber Day",
    morning: {
      meal: "Mango Turmeric Recovery Shake",
      desc: "Blend: 1 cup frozen mango, ½ tsp turmeric, ¼ tsp black pepper (boosts absorption), 1 scoop vanilla protein, 1 tbsp chia seeds, 1 cup coconut milk. Anti-inflammatory and bright.",
      prep: "3 min", tags: ["protein","fiber","easy"],
    },
    lunch: {
      meal: "White Bean Soup — Last of Batch",
      desc: "Finish the Sunday pot. Squeeze fresh lemon in, top with olive oil and whole grain bread for dipping.",
      prep: "0 min", tags: ["protein","fiber","veg"],
    },
    dinner: {
      meal: "Sesame Crusted Tuna + Quinoa Tabbouleh",
      desc: "Ahi tuna coated in sesame seeds, seared 60 sec per side. Quinoa tabbouleh: quinoa, cucumber, parsley, mint, lemon, olive oil. A dinner that photographs as well as it tastes.",
      prep: "25 min", tags: ["protein","fish","fiber"],
    },
    notes: "Thursday grocery run — see list. You're in the home stretch.",
  },
];

const WEEK2_THURS = [
  {
    day: "Thursday", date: "Day 12", theme: "Home Stretch",
    morning: {
      meal: "Cottage Cheese Protein Shake",
      desc: "Blend: ½ cup cottage cheese, ½ cup frozen peaches, 1 tbsp honey, ½ cup almond milk, ½ tsp vanilla. Silky, high protein (~28g), no powder needed. Try it before you doubt it.",
      prep: "3 min", tags: ["protein","easy"],
    },
    lunch: {
      meal: "Smoked Salmon & Cucumber Stack",
      desc: "Thick cucumber rounds topped with whipped cream cheese, smoked salmon, capers, dill, and cracked pepper. Prep in 5 min, eat like the world's best snack plate.",
      prep: "5 min", tags: ["protein","fish","easy"],
    },
    dinner: {
      meal: "Moroccan Spiced Lentil & Chickpea Stew",
      desc: "Green lentils and chickpeas simmered with cumin, coriander, cinnamon, smoked paprika, canned tomatoes, and vegetable broth. Top with a yogurt swirl and fresh cilantro. Serve with warm pita. Bold, hearty, fully plant-based.",
      prep: "35 min", tags: ["protein","fiber","veg"],
    },
    notes: "Make extra stew — Friday lunch is done.",
  },
  {
    day: "Friday", date: "Day 13", theme: "Strong Finish",
    morning: {
      meal: "Dark Cherry Recovery Smoothie",
      desc: "Blend: 1 cup frozen dark cherries, 1 scoop chocolate protein, 1 tbsp almond butter, 1 cup oat milk, 1 tsp cocoa. Rich, anti-inflammatory, ~35g protein. Post-workout or just breakfast.",
      prep: "3 min", tags: ["protein","fiber","easy"],
    },
    lunch: {
      meal: "Moroccan Stew (Leftover)",
      desc: "Straight from the fridge in a thermos or microwaved. Drop in a pita for dipping. Stew is always better on day 2.",
      prep: "0 min", tags: ["protein","fiber","veg"],
    },
    dinner: {
      meal: "Miso-Glazed Salmon + Roasted Asparagus + Farro",
      desc: "Salmon broiled with white miso, honey, and rice vinegar — deep caramelized glaze in 10 min. Asparagus roasted with lemon. Nutty farro as the base. A Friday dinner worth staying in for.",
      prep: "30 min", tags: ["protein","fish","fiber"],
    },
    notes: "Two weeks almost done. Tomorrow is your celebration meal.",
  },
  {
    day: "Saturday", date: "Day 14", theme: "You Did It",
    morning: {
      meal: "Golden Milk Protein Smoothie Bowl",
      desc: "Blend thick: frozen banana, ½ tsp turmeric, ½ tsp cinnamon, 1 scoop vanilla protein, ½ cup Greek yogurt, splash of almond milk. Top with granola, hemp seeds, sliced mango, and a honey drizzle. Take your time.",
      prep: "8 min", tags: ["protein","fiber"],
    },
    lunch: {
      meal: "Burrata & White Bean Toast",
      desc: "Thick whole-grain toast, smashed white beans seasoned with lemon and garlic, fresh burrata on top, cherry tomatoes, torn basil, olive oil, flaky salt. Outrageously good for how simple it is.",
      prep: "8 min", tags: ["protein","fiber","veg"],
    },
    dinner: {
      meal: "Whole Roasted Sea Bass + Salsa Verde + Roasted Baby Potatoes",
      desc: "Your 14-day celebration dinner. Whole sea bass with olive oil and herbs, roasted at 425°F. Vibrant salsa verde: parsley, capers, garlic, lemon, olive oil. Baby potatoes tossed with rosemary and roasted alongside. You earned this.",
      prep: "45 min", tags: ["protein","fish"],
    },
    notes: "Two full weeks! Review what felt easiest and build Week 3 from there.",
  },
];

// ─── Grocery Lists ─────────────────────────────────────────────────────────────

const GROCERY_SUN1 = {
  title: "Sunday Shop — Week 1, Days 1–4",
  sections: [
    { cat: "Fish & Seafood", icon: "🐟", items: ["3 salmon fillets","2 cod fillets","1 lb shrimp, frozen peeled","Canned albacore tuna (2 cans)"] },
    { cat: "Produce", icon: "🥦", items: ["2 sweet potatoes","1 head broccolini","2 bunches kale","1 bag baby spinach","1 bag romaine lettuce","Cherry tomatoes (1 pint)","2 cucumbers","Shredded purple cabbage (bag)","Shredded carrots (bag)","1 fennel bulb","2 avocados","3 limes","2 lemons","3 bananas (freeze 2)","Frozen mango chunks","Frozen pineapple chunks","Frozen mixed berries","Frozen blueberries","Fresh dill","Arugula (bag)"] },
    { cat: "Protein & Dairy", icon: "🥛", items: ["Plain Greek yogurt, 32 oz","Feta cheese (crumbled)","Hard cheese: parmesan","Protein powder (vanilla + chocolate — your choice of brand)"] },
    { cat: "Pantry", icon: "🫙", items: ["Canned white beans (3 cans)","Canned black beans (2 cans)","Canned chickpeas (2 cans)","Brown rice","Quinoa","Whole wheat tortillas","Corn tortillas","Ground flax seed","Chia seeds","Hemp seeds","Almond butter","Peanut butter","Almond milk, unsweetened","Oat milk","Coconut water","Matcha powder","Cocoa powder","Tahini","White miso paste","Tamari or low-sodium soy sauce","Rice vinegar","Sesame oil","Olive oil","Honey","Everything bagel seasoning","Chili powder, cumin, oregano","Whole grain crackers","Low-sugar granola","Capers (jar)","Roasted red peppers (jar)","Enchilada sauce (jar or can)","Lemon-tahini dressing or make it"] },
  ],
};

const GROCERY_THU1 = {
  title: "Thursday Shop — Week 1, Days 5–7",
  sections: [
    { cat: "Fish & Seafood", icon: "🐟", items: ["2 ahi tuna steaks","2 whole branzino (ask fishmonger to clean)","Smoked salmon (4 oz)"] },
    { cat: "Produce", icon: "🥦", items: ["Acai packets (frozen, 2–4)","Extra bananas","Fresh basil","Fresh parsley","Fresh mint","Kalamata olives (jar or deli)","Red onion","More cherry tomatoes","Extra avocado","Extra edamame (frozen, shelled)"] },
    { cat: "Protein & Dairy", icon: "🥛", items: ["More Greek yogurt if running low","Miso soup packets or miso paste"] },
    { cat: "Pantry", icon: "🫙", items: ["Mirin (Asian aisle)","Pickled ginger (sushi ginger)","Red wine vinegar","Dried oregano","Kalamata olives if not stocked","Sesame seeds","Whole grain bread (thick cut)","More oat milk if needed"] },
  ],
};

const GROCERY_SUN2 = {
  title: "Sunday Shop — Week 2, Days 8–11",
  sections: [
    { cat: "Fish & Seafood", icon: "🐟", items: ["3 salmon fillets","1 lb shrimp, frozen peeled","2 ahi tuna steaks","Canned albacore tuna (2 cans)"] },
    { cat: "Produce", icon: "🥦", items: ["2 heads bok choy","4 large bell peppers","1 bunch kale","1 bag baby spinach","1 bag arugula","Cherry tomatoes","2 cucumbers","Fresh parsley (2 bunches)","Fresh mint","2 lemons","3 limes","Extra bananas","Frozen strawberries","Frozen mango","Frozen peaches","Frozen pineapple","Fresh strawberries (optional)","Diced tomatoes, canned (2 cans)"] },
    { cat: "Protein & Dairy", icon: "🥛", items: ["Plain Greek yogurt, 32 oz","Feta cheese (block)","Parmesan, shredded","Cottage cheese (16 oz)","Cream cheese (4 oz)","1 dozen eggs"] },
    { cat: "Pantry", icon: "🫙", items: ["Green or brown lentils (1 lb dry)","Farro (dry grain)","Chickpea pasta (1 box)","Vegetable broth (32 oz)","Chickpeas, canned (2 more cans)","White beans, canned (2 cans)","Mirin","Pickled ginger","Turmeric, ground","Black pepper (freshly ground)","Smoked paprika","Cinnamon","Coriander, ground","Whole grain pita","Coconut milk (can)","More protein powder if low","More almond butter"] },
  ],
};

const GROCERY_THU2 = {
  title: "Thursday Shop — Week 2, Days 12–14",
  sections: [
    { cat: "Fish & Seafood", icon: "🐟", items: ["2 salmon fillets","Smoked salmon (4 oz)","1–2 whole sea bass (ask fishmonger to clean)"] },
    { cat: "Produce", icon: "🥦", items: ["1 bunch asparagus","Baby potatoes (fingerling or small)","Fresh rosemary + thyme","Fresh cilantro","Fresh basil","Burrata cheese (1–2 balls)","Extra cherry tomatoes","Frozen dark cherries","More bananas","Mango (fresh, for topping)"] },
    { cat: "Protein & Dairy", icon: "🥛", items: ["More Greek yogurt if needed","Whipped cream cheese (for salmon toast)"] },
    { cat: "Pantry", icon: "🫙", items: ["More capers","More white miso paste if low","Honey (if running out)","More granola","More hemp seeds","Whole-grain bread or toast","Olive oil (if running low)","Flaky sea salt"] },
  ],
};

// ─── Components ───────────────────────────────────────────────────────────────

const TAG_MAP = {
  protein: { bg: C.tProBg, tx: C.tProTx, label: "Protein" },
  fiber:   { bg: C.tFibBg, tx: C.tFibTx, label: "Fiber"   },
  easy:    { bg: C.tEasyBg, tx: C.tEasyTx, label: "Quick"  },
  veg:     { bg: C.tVegBg, tx: C.tVegTx,  label: "Veg"    },
  fish:    { bg: C.tFishBg, tx: C.tFishTx, label: "Fish"   },
};

function Pill({ type }) {
  const t = TAG_MAP[type];
  return (
    <span style={{
      background: t.bg, color: t.tx, fontSize: 10, fontWeight: 700,
      padding: "2px 8px", borderRadius: 20, whiteSpace: "nowrap",
    }}>{t.label}</span>
  );
}

function MealRow({ icon, label, meal }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
        <span style={{ fontSize: 14 }}>{icon}</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: C.slate, textTransform: "uppercase", letterSpacing: "0.07em" }}>{label}</span>
        {meal.prep && <span style={{ fontSize: 11, color: C.oceanMid, fontWeight: 600, marginLeft: 2 }}>· {meal.prep}</span>}
      </div>
      <div style={{ fontWeight: 800, fontSize: 15, color: C.ink, marginBottom: 4 }}>{meal.meal}</div>
      <div style={{ fontSize: 13, color: C.slate, lineHeight: 1.55, marginBottom: 6 }}>{meal.desc}</div>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
        {meal.tags.map(t => <Pill key={t} type={t} />)}
      </div>
    </div>
  );
}

const DAY_HUES = ["#1B5E7B","#2C8FAD","#3DAA7A","#1A7A5E","#1A5270","#2A7A8A","#3D8B5E"];

function DayCard({ d }) {
  const [open, setOpen] = useState(false);
  const idx = parseInt(d.date.replace("Day ", "")) - 1;
  const hue = DAY_HUES[idx % DAY_HUES.length];

  return (
    <div style={{
      background: C.white, border: `1px solid ${C.border}`,
      borderRadius: 14, overflow: "hidden", marginBottom: 10,
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", padding: "14px 16px", background: "none",
          border: "none", cursor: "pointer", display: "flex",
          alignItems: "center", justifyContent: "space-between", gap: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, background: hue,
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", flexShrink: 0,
          }}>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 9, fontWeight: 700, letterSpacing: "0.04em" }}>{d.date}</span>
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 900 }}>{d.day.slice(0,3).toUpperCase()}</span>
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontWeight: 800, fontSize: 16, color: C.ink }}>{d.day}</div>
            <div style={{ fontSize: 12, color: C.slate, fontStyle: "italic" }}>{d.theme}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, color: C.ocean,
            background: C.oceanLight, padding: "3px 8px", borderRadius: 20,
          }}>🥤 Shake</span>
          <span style={{
            color: C.slate, fontSize: 16,
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.2s",
          }}>▾</span>
        </div>
      </button>

      {open && (
        <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${C.border}` }}>
          <div style={{ paddingTop: 14 }}>
            <MealRow icon="🥤" label="Morning Shake / Smoothie" meal={d.morning} />
            <div style={{ height: 1, background: C.border, margin: "10px 0" }} />
            <MealRow icon="🥗" label="Lunch" meal={d.lunch} />
            <div style={{ height: 1, background: C.border, margin: "10px 0" }} />
            <MealRow icon="🍳" label="Dinner" meal={d.dinner} />
            {d.notes && (
              <div style={{
                marginTop: 12, padding: "10px 13px",
                background: C.oceanLight, borderRadius: 9,
                borderLeft: `3px solid ${C.oceanMid}`,
                fontSize: 12, color: C.ocean, fontWeight: 600, lineHeight: 1.5,
              }}>💡 {d.notes}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function GroceryList({ data }) {
  const [checked, setChecked] = useState({});
  const toggle = k => setChecked(p => ({ ...p, [k]: !p[k] }));
  const total = data.sections.reduce((a, s) => a + s.items.length, 0);
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <div>
      {/* Progress */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{ flex: 1, height: 7, background: C.border, borderRadius: 99, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${(done / total) * 100}%`,
            background: C.algae, borderRadius: 99, transition: "width 0.3s",
          }} />
        </div>
        <span style={{ fontSize: 12, color: C.slate, fontWeight: 600, flexShrink: 0 }}>{done}/{total}</span>
        <button
          onClick={() => setChecked({})}
          style={{
            fontSize: 11, color: C.slate, background: "none",
            border: `1px solid ${C.border}`, borderRadius: 6,
            padding: "3px 8px", cursor: "pointer",
          }}
        >Reset</button>
      </div>

      {data.sections.map(sec => (
        <div key={sec.cat} style={{ marginBottom: 18 }}>
          <div style={{
            fontWeight: 800, fontSize: 13, color: C.ink,
            marginBottom: 8, display: "flex", alignItems: "center", gap: 6,
          }}>
            <span>{sec.icon}</span> {sec.cat}
          </div>
          {sec.items.map((item, i) => {
            const k = `${sec.cat}-${i}`;
            return (
              <div
                key={k}
                onClick={() => toggle(k)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "8px 10px", borderRadius: 8, cursor: "pointer",
                  marginBottom: 2, transition: "background 0.15s",
                  background: checked[k] ? C.seafoam : C.sand,
                  opacity: checked[k] ? 0.55 : 1,
                }}
              >
                <div style={{
                  width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                  border: `2px solid ${checked[k] ? C.algae : C.border}`,
                  background: checked[k] ? C.algae : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {checked[k] && <span style={{ color: "#fff", fontSize: 11, fontWeight: 900 }}>✓</span>}
                </div>
                <span style={{
                  fontSize: 14, color: C.ink,
                  textDecoration: checked[k] ? "line-through" : "none",
                }}>{item}</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [view, setView] = useState("plan");
  const [week, setWeek] = useState(1);
  const [gList, setGList] = useState("sun1");

  const allW1 = [...WEEK1, ...WEEK1_THURS];
  const allW2 = [...WEEK2, ...WEEK2_THURS];

  const groceries = { sun1: GROCERY_SUN1, thu1: GROCERY_THU1, sun2: GROCERY_SUN2, thu2: GROCERY_THU2 };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: C.sand, minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: C.ocean, padding: "20px 20px 0" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em", marginBottom: 4 }}>
            Pescatarian · High Protein · 2-Week Plan
          </div>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 900, margin: 0, lineHeight: 1.2 }}>
            Shake. Eat. Thrive.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, margin: "5px 0 16px", lineHeight: 1.5 }}>
            Every morning starts with a protein shake or smoothie. Lunches are quick. Dinners are real.
          </p>

          {/* Stat strip */}
          <div style={{ display: "flex", gap: 12, paddingBottom: 14, overflowX: "auto" }}>
            {[
              { val: "30–40g", label: "Morning protein" },
              { val: "0 meat", label: "Veg + fish only" },
              { val: "3–5 min", label: "Morning prep" },
              { val: "14 days", label: "Full plan" },
            ].map(s => (
              <div key={s.label} style={{
                flexShrink: 0, background: "rgba(255,255,255,0.12)",
                borderRadius: 10, padding: "8px 14px", textAlign: "center",
              }}>
                <div style={{ color: "#fff", fontWeight: 900, fontSize: 15 }}>{s.val}</div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, marginTop: 1 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Nav */}
          <div style={{ display: "flex", gap: 0, borderBottom: "none" }}>
            {[{ id: "plan", label: "📋 Meal Plan" }, { id: "groceries", label: "🛒 Grocery Lists" }].map(tab => (
              <button
                key={tab.id}
                onClick={() => setView(tab.id)}
                style={{
                  flex: 1, padding: "11px 0", background: "none", border: "none",
                  cursor: "pointer", fontSize: 13, fontWeight: 700,
                  color: view === tab.id ? "#fff" : "rgba(255,255,255,0.5)",
                  borderBottom: `3px solid ${view === tab.id ? C.algae : "transparent"}`,
                  transition: "all 0.15s",
                }}
              >{tab.label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "16px 16px 50px" }}>

        {/* ── Meal Plan ── */}
        {view === "plan" && (
          <>
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              {[1, 2].map(w => (
                <button key={w} onClick={() => setWeek(w)} style={{
                  flex: 1, padding: 11, borderRadius: 10, cursor: "pointer",
                  border: `2px solid ${week === w ? C.ocean : C.border}`,
                  background: week === w ? C.oceanLight : C.white,
                  color: week === w ? C.ocean : C.slate,
                  fontWeight: 800, fontSize: 14, transition: "all 0.15s",
                }}>Week {w}</button>
              ))}
            </div>

            {/* Legend */}
            <div style={{
              background: C.white, border: `1px solid ${C.border}`, borderRadius: 10,
              padding: "10px 14px", marginBottom: 14,
              display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center",
            }}>
              <span style={{ fontSize: 11, color: C.slate, fontWeight: 600, marginRight: 4 }}>Tags:</span>
              {Object.entries(TAG_MAP).map(([k, v]) => (
                <span key={k} style={{ background: v.bg, color: v.tx, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>{v.label}</span>
              ))}
            </div>

            {(week === 1 ? allW1 : allW2).map(d => <DayCard key={d.date} d={d} />)}
          </>
        )}

        {/* ── Groceries ── */}
        {view === "groceries" && (
          <>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14,
            }}>
              {[
                { id: "sun1", label: "Week 1 Sunday", sub: "Days 1–4" },
                { id: "thu1", label: "Week 1 Thursday", sub: "Days 5–7" },
                { id: "sun2", label: "Week 2 Sunday", sub: "Days 8–11" },
                { id: "thu2", label: "Week 2 Thursday", sub: "Days 12–14" },
              ].map(g => (
                <button key={g.id} onClick={() => setGList(g.id)} style={{
                  padding: "10px 12px", borderRadius: 10, cursor: "pointer",
                  border: `2px solid ${gList === g.id ? C.ocean : C.border}`,
                  background: gList === g.id ? C.oceanLight : C.white,
                  textAlign: "left", transition: "all 0.15s",
                }}>
                  <div style={{ fontWeight: 800, fontSize: 13, color: gList === g.id ? C.ocean : C.ink }}>{g.label}</div>
                  <div style={{ fontSize: 11, color: C.slate }}>{g.sub}</div>
                </button>
              ))}
            </div>

            <div style={{
              background: C.white, borderRadius: 14, padding: 18,
              border: `1px solid ${C.border}`,
              boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
            }}>
              <h2 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 900, color: C.ink }}>
                {groceries[gList].title}
              </h2>
              <GroceryList data={groceries[gList]} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}