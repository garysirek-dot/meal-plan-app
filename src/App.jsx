import { useState, useEffect } from "react";

// ─── THEMES ──────────────────────────────────────────────────────────────────
const THEMES = {
  pescatarian: {
    id:"pescatarian", label:"Pescatarian",
    primary:"#1B5E7B", mid:"#2C8FAD", light:"#E3F4FA",
    seafoam:"#D6EFE8", accent:"#3DAA7A", accentLight:"#E3F6EE",
    border:"#DCE8EC", tagNote:"Veg & Fish only",
    dayHues:["#1B5E7B","#1E6F8F","#2280A3","#2C8FAD","#2A7F9A","#236E87","#1D6278","#195571","#22768E","#267FA0","#1F6A84","#2B8CAE","#1A5C75","#248898"],
  },
  classic: {
    id:"classic", label:"American",
    primary:"#2E6B3E", mid:"#3D8B52", light:"#E8F5EC",
    seafoam:"#D4EDD9", accent:"#E07A3A", accentLight:"#FDF0E8",
    border:"#D8E8DC", tagNote:"High Protein American",
    dayHues:["#2E6B3E","#347844","#3A864B","#3D8B52","#3F9158","#32753F","#2C6A3B","#3B8A4F","#368048","#3D8D53","#307240","#3C8A50","#2A6338","#3F9259"],
  },
  mediterranean: {
    id:"mediterranean", label:"Mediterranean",
    primary:"#4A2D7A", mid:"#6B46AA", light:"#F0EAF8",
    seafoam:"#E2D4F5", accent:"#B5479A", accentLight:"#FAE8F5",
    border:"#DDD0EE", tagNote:"Low Fat · High Protein",
    dayHues:["#4A2D7A","#573595","#623DA0","#6B46AA","#7450B2","#5C3A9B","#4F3088","#6A44A8","#5E3D9E","#7254B5","#543292","#6840A5","#4C2E80","#6E48AC"],
  },
};

// ─── TAG STYLES ───────────────────────────────────────────────────────────────
const TAG_MAP = {
  protein:{ bg:"#D4EDE4", tx:"#1A6644", label:"Protein" },
  fiber:  { bg:"#D6EDF7", tx:"#0C4A6B", label:"Fiber"   },
  easy:   { bg:"#FEF3DC", tx:"#7A5500", label:"Quick"   },
  veg:    { bg:"#E8F5E2", tx:"#2F6B1A", label:"Veg"     },
  fish:   { bg:"#E0ECF8", tx:"#1A3F6B", label:"Fish"    },
  shake:  { bg:"#F3E8FF", tx:"#5B21B6", label:"Shake"   },
  meat:   { bg:"#FDE8E8", tx:"#7A1A1A", label:"Meat"    },
  med:    { bg:"#FFF0F9", tx:"#7A1A5A", label:"Med"     },
};

// ─── PESCATARIAN DATA ─────────────────────────────────────────────────────────
const PESC_WEEK1 = [
  {
    day:"Sunday", date:"Day 1", theme:"Kickoff",
    morning:{ meal:"Green Power Smoothie", cal:320, desc:"Blend: 1 cup frozen spinach, 1 frozen banana, 1 scoop vanilla protein, 1 tbsp almond butter, 1 cup almond milk, 1 tsp matcha. ~35g protein.", prep:"3 min", tags:["shake","protein","fiber"] },
    lunch:{ meal:"White Bean & Avocado Smash Wrap", cal:410, desc:"Mash canned white beans with avocado, lemon, red pepper flakes. Spread in whole wheat tortilla with arugula and cucumber.", prep:"5 min", tags:["protein","fiber","veg"] },
    dinners:[
      { meal:"Honey Garlic Salmon + Roasted Sweet Potato + Broccolini", cal:520, desc:"Salmon glazed with honey, garlic, tamari. Sweet potato wedges and broccolini on same sheet pan at 425°F for 25 min.", prep:"30 min", tags:["protein","fish"] },
      { meal:"Lemon Butter Shrimp + Cauliflower Rice + Asparagus", cal:440, desc:"Shrimp sautéed in lemon butter and garlic. Cauliflower rice with herbs. Roasted asparagus with olive oil and lemon zest.", prep:"20 min", tags:["protein","fish"] },
      { meal:"Miso Cod + Bok Choy + Brown Rice", cal:490, desc:"Cod fillets glazed with white miso and honey, broiled 10 min. Stir-fried bok choy with garlic and sesame oil. Brown rice base.", prep:"25 min", tags:["protein","fish","fiber"] },
    ],
    notes:"Boil 6 eggs tonight — they'll carry you through the week.",
  },
  {
    day:"Monday", date:"Day 2", theme:"Fuel Up",
    morning:{ meal:"Triple Berry Protein Shake", cal:350, desc:"Blend: 1 cup frozen mixed berries, 1 scoop protein, 1 cup Greek yogurt, 1 tbsp chia seeds, ½ cup milk. ~40g protein.", prep:"3 min", tags:["shake","protein","fiber"] },
    lunch:{ meal:"Chickpea Mason Jar Salad", cal:390, desc:"Layer: lemon-tahini dressing, chickpeas, cherry tomatoes, cucumber, roasted red pepper, feta, romaine on top. Shake and eat.", prep:"5 min", tags:["protein","fiber","veg"] },
    dinners:[
      { meal:"Miso-Glazed Cod + Edamame Slaw + Brown Rice", cal:510, desc:"Cod coated in white miso, honey, rice vinegar — broil 10 min. Slaw: cabbage, edamame, sesame oil. Serve over brown rice.", prep:"25 min", tags:["protein","fish","fiber"] },
      { meal:"Teriyaki Salmon Bowl + Snap Peas + Quinoa", cal:540, desc:"Salmon glazed with soy, mirin, honey. Snap peas sautéed with garlic. Served over fluffy quinoa with sesame seeds.", prep:"25 min", tags:["protein","fish"] },
      { meal:"Garlic Shrimp & Zucchini Noodles + Cherry Tomatoes", cal:380, desc:"Shrimp in garlic butter and white wine over spiralized zucchini. Burst cherry tomatoes, fresh basil, parmesan finish.", prep:"20 min", tags:["protein","fish"] },
    ],
    notes:"Make overnight oats tonight for Tuesday morning.",
  },
  {
    day:"Tuesday", date:"Day 3", theme:"Steady",
    morning:{ meal:"PB Banana Protein Shake", cal:380, desc:"Blend: 1 frozen banana, 2 tbsp PB, 1 scoop chocolate protein, 1 tbsp flax, 1 cup oat milk. ~35g protein. Tastes like dessert.", prep:"3 min", tags:["shake","protein","fiber"] },
    lunch:{ meal:"Edamame & Brown Rice Bowl", cal:420, desc:"Brown rice + edamame + shredded carrots + avocado + tamari and sesame oil drizzle. Top with everything bagel seasoning.", prep:"4 min", tags:["protein","fiber","veg"] },
    dinners:[
      { meal:"Spicy Shrimp Tacos + Cabbage Slaw + Lime Crema", cal:490, desc:"Shrimp tossed in chili, cumin, garlic — sauté 4 min. Corn tortillas, purple cabbage, lime crema (Greek yogurt + lime).", prep:"20 min", tags:["protein","fish"] },
      { meal:"Blackened Salmon + Roasted Corn Salsa + Brown Rice", cal:530, desc:"Salmon fillet with bold blackening spices. Roasted corn salsa: corn, red onion, jalapeño, lime. Brown rice base.", prep:"25 min", tags:["protein","fish"] },
      { meal:"Coconut Curry Shrimp + Jasmine Rice + Spinach", cal:520, desc:"Shrimp simmered in light coconut milk, red curry paste, ginger, garlic. Wilted spinach folded in. Jasmine rice base.", prep:"25 min", tags:["protein","fish","fiber"] },
    ],
    notes:"Cook extra brown rice tonight for Wednesday lunch.",
  },
  {
    day:"Wednesday", date:"Day 4", theme:"Halfway",
    morning:{ meal:"Tropical Greens Smoothie", cal:310, desc:"Blend: 1 cup frozen mango, ½ cup frozen pineapple, 1 cup baby spinach, 1 scoop vanilla protein, 1 tbsp hemp seeds, 1 cup coconut water.", prep:"3 min", tags:["shake","protein","fiber"] },
    lunch:{ meal:"Leftover Rice Bowl Remix", cal:380, desc:"Tuesday's rice + canned black beans + salsa + feta. Microwave 90 sec. Add hot sauce.", prep:"2 min", tags:["protein","fiber","veg"] },
    dinners:[
      { meal:"Lemon Herb Salmon + Quinoa + Sautéed Spinach", cal:510, desc:"Salmon baked with olive oil, lemon zest, fresh dill, capers at 400°F for 15 min. Big pile of garlicky spinach. Fluffy quinoa.", prep:"25 min", tags:["protein","fish","fiber"] },
      { meal:"Ahi Tuna Poke Bowl + Edamame + Cucumber + Rice", cal:490, desc:"Sushi-grade tuna cubed, marinated in tamari, sesame oil, sriracha. Over sushi rice with edamame, cucumber, avocado, pickled ginger.", prep:"15 min", tags:["protein","fish"] },
      { meal:"Pan-Seared Cod + White Bean Ragù + Wilted Kale", cal:460, desc:"Cod seared golden. White bean ragù: beans, garlic, cherry tomatoes, white wine, thyme. Wilted kale alongside.", prep:"25 min", tags:["protein","fish","fiber"] },
    ],
    notes:"Thursday grocery run — check the list before you go.",
  },
  {
    day:"Thursday", date:"Day 5", theme:"Second Wind",
    morning:{ meal:"Chocolate Greens Protein Shake", cal:340, desc:"Blend: 1 cup frozen spinach, 1 tbsp cocoa, 1 scoop chocolate protein, 1 tbsp almond butter, 1 cup oat milk. Like a healthy Frosty.", prep:"3 min", tags:["shake","protein","fiber"] },
    lunch:{ meal:"Tuna & White Bean Lettuce Cups", cal:360, desc:"Canned albacore tuna + white beans + capers + lemon + olive oil + dijon. Scoop into romaine leaves.", prep:"5 min", tags:["protein","fish"] },
    dinners:[
      { meal:"Black Bean & Sweet Potato Enchilada Bowls", cal:520, desc:"Roast sweet potato with chili powder. Layer over brown rice with black beans, enchilada sauce, cheddar, Greek yogurt crema.", prep:"35 min", tags:["protein","fiber","veg"] },
      { meal:"Sesame Crusted Ahi Tuna + Bok Choy + Miso Soup", cal:450, desc:"Ahi coated in sesame seeds, seared 60 sec per side. Bok choy stir-fried with garlic. Quick miso soup from paste.", prep:"20 min", tags:["protein","fish"] },
      { meal:"Shrimp Fried Cauliflower Rice + Edamame + Egg", cal:420, desc:"Cauliflower rice stir-fried with shrimp, edamame, scrambled egg, tamari, sesame oil, green onions. Better than takeout.", prep:"20 min", tags:["protein","fish"] },
    ],
    notes:"Soak lentils overnight if making Friday's dinner.",
  },
  {
    day:"Friday", date:"Day 6", theme:"Strong Finish",
    morning:{ meal:"Blueberry Flax Smoothie", cal:300, desc:"Blend: 1 cup frozen blueberries, 1 cup Greek yogurt, 1 tbsp ground flax, 1 tsp honey, ½ cup almond milk. ~30g protein — no powder needed.", prep:"3 min", tags:["shake","protein","fiber"] },
    lunch:{ meal:"Hard-Boiled Egg & Avocado Box", cal:340, desc:"2 hard-boiled eggs + half avocado with lemon and flaky salt + cherry tomatoes + whole grain crackers. Pack in a bento box.", prep:"2 min", tags:["protein","veg","easy"] },
    dinners:[
      { meal:"Ahi Tuna Steak + Sesame Edamame + Miso Soup", cal:460, desc:"Ahi seared 90 sec per side. Sliced against the grain. Sesame edamame + quick miso soup from paste. A restaurant Friday at home.", prep:"20 min", tags:["protein","fish"] },
      { meal:"Salmon Niçoise Salad + Dijon Vinaigrette", cal:480, desc:"Seared salmon over romaine with green beans, hard-boiled egg, olives, cherry tomatoes, capers. Classic dijon vinaigrette.", prep:"25 min", tags:["protein","fish","fiber"] },
      { meal:"Garlic Butter Scallops + Roasted Asparagus + Lemon Risotto", cal:560, desc:"Pan-seared scallops in brown butter and garlic. Asparagus roasted with lemon. Light lemon risotto made with parmesan and white wine.", prep:"35 min", tags:["protein","fish"] },
    ],
    notes:"You made it through Week 1!",
  },
  {
    day:"Saturday", date:"Day 7", theme:"Weekend",
    morning:{ meal:"Açaí Smoothie Bowl", cal:410, desc:"Thick blend: frozen açaí packet, frozen banana, protein powder, almond milk. Top with granola, sliced banana, hemp seeds, almond butter drizzle.", prep:"8 min", tags:["shake","protein","fiber"] },
    lunch:{ meal:"Big Feta & Chickpea Greek Salad", cal:390, desc:"Romaine, kalamata olives, cucumber, cherry tomatoes, red onion, feta, chickpeas. Olive oil + red wine vinegar + oregano.", prep:"8 min", tags:["protein","fiber","veg"] },
    dinners:[
      { meal:"Whole Roasted Branzino + Herb Oil + Roasted Fennel", cal:510, desc:"Whole fish stuffed with lemon and fresh herbs, roasted at 425°F for 20 min. Fennel roasted alongside. Finished with bright herb oil.", prep:"35 min", tags:["protein","fish"] },
      { meal:"Lobster Tacos + Mango Slaw + Chipotle Crema", cal:490, desc:"Butter-poached lobster tail in corn tortillas with mango slaw, chipotle Greek yogurt crema, fresh cilantro. A Saturday celebration.", prep:"30 min", tags:["protein","fish"] },
      { meal:"Seared Halibut + Brown Butter Capers + Roasted Beets + Farro", cal:530, desc:"Halibut seared in olive oil, finished with brown butter, capers, and lemon. Roasted beets and nutty farro alongside.", prep:"35 min", tags:["protein","fish","fiber"] },
    ],
    notes:"Week 2 starts tomorrow — prep Sunday grocery list tonight.",
  },
];

const PESC_WEEK2 = [
  {
    day:"Sunday", date:"Day 8", theme:"Week 2 Begin",
    morning:{ meal:"Matcha Almond Protein Shake", cal:310, desc:"Blend: 1 tsp matcha, 1 scoop vanilla protein, 1 tbsp almond butter, 1 cup almond milk, ½ frozen banana. Clean energy, no crash.", prep:"3 min", tags:["shake","protein"] },
    lunch:{ meal:"White Bean & Kale Soup (batch cook)", cal:350, desc:"Big pot: olive oil, garlic, white beans, veggie broth, kale, diced tomatoes, Italian seasoning, lemon. Simmer 20 min. Eat all week.", prep:"25 min", tags:["protein","fiber","veg"] },
    dinners:[
      { meal:"Teriyaki Salmon Bowl + Bok Choy + Brown Rice", cal:540, desc:"Salmon glazed with soy, mirin, honey. Stir-fry bok choy with garlic. Brown rice base. Sesame seeds and pickled ginger on top.", prep:"30 min", tags:["protein","fish"] },
      { meal:"Miso Ramen with Soft-Boiled Egg + Shrimp + Nori", cal:520, desc:"Rich miso broth with ramen noodles, shrimp, soft-boiled egg, nori sheets, green onions, sesame oil. A real bowl.", prep:"25 min", tags:["protein","fish"] },
      { meal:"Baked Lemon Dill Salmon + Roasted Fingerlings + Green Beans", cal:500, desc:"Salmon with fresh dill, lemon, and capers baked at 400°F. Fingerling potatoes roasted crispy. Green beans with garlic.", prep:"30 min", tags:["protein","fish","fiber"] },
    ],
    notes:"Hard-boil 6 eggs tonight.",
  },
  {
    day:"Monday", date:"Day 9", theme:"Locked In",
    morning:{ meal:"Strawberry Basil Protein Smoothie", cal:330, desc:"Blend: 1 cup frozen strawberries, 3–4 fresh basil leaves, 1 scoop vanilla protein, 1 cup Greek yogurt, ½ cup almond milk. ~38g protein.", prep:"3 min", tags:["shake","protein","fiber"] },
    lunch:{ meal:"White Bean Soup (from Sunday)", cal:340, desc:"Thermos or microwave. Add olive oil and parmesan on top. Soup gets better on day 2.", prep:"0 min", tags:["protein","fiber","veg"] },
    dinners:[
      { meal:"Stuffed Bell Peppers with Lentils & Feta", cal:480, desc:"Bell peppers filled with green lentils, diced tomatoes, cumin, smoked paprika, crumbled feta. Baked at 375°F for 30 min.", prep:"40 min", tags:["protein","fiber","veg"] },
      { meal:"Shrimp & Grits with Roasted Peppers", cal:530, desc:"Creamy stone-ground grits topped with sautéed shrimp, roasted red peppers, garlic, and fresh parsley. Southern comfort, lightened up.", prep:"30 min", tags:["protein","fish"] },
      { meal:"Pan-Seared Cod + Olive Tapenade + Couscous + Roasted Zucchini", cal:470, desc:"Cod seared golden with olive tapenade spooned on top. Herbed couscous. Zucchini roasted with lemon and thyme.", prep:"25 min", tags:["protein","fish","fiber"] },
    ],
    notes:"Make extra lentil filling for Tuesday's lunch.",
  },
  {
    day:"Tuesday", date:"Day 10", theme:"Dialed",
    morning:{ meal:"Overnight Protein Oat Shake", cal:360, desc:"Night before: blend ¼ cup rolled oats, 1 scoop protein, 1 tbsp PB, 1 cup oat milk, ½ banana. Refrigerate. Shake and drink in the morning.", prep:"0 min", tags:["shake","protein","fiber"] },
    lunch:{ meal:"Lentil Bowl (Leftover)", cal:370, desc:"Stuffed pepper filling over arugula with lemon squeeze and feta sprinkle. No reheating needed.", prep:"2 min", tags:["protein","fiber","veg"] },
    dinners:[
      { meal:"Garlic Butter Shrimp over Chickpea Pasta", cal:510, desc:"Shrimp in garlic, butter, white wine, lemon. Over chickpea pasta. Finish with parmesan and parsley. 20 min total.", prep:"20 min", tags:["protein","fish"] },
      { meal:"Seared Scallops + Pea Purée + Prosciutto Crisp", cal:470, desc:"Golden seared scallops over a silky pea purée. Crispy prosciutto crumbled on top. Restaurant plating at home.", prep:"25 min", tags:["protein","fish"] },
      { meal:"Salmon Burgers + Sweet Potato Fries + Avocado Slaw", cal:560, desc:"Homemade salmon patties with dijon and herbs. Air-fried sweet potato fries. Creamy avocado-lime slaw.", prep:"30 min", tags:["protein","fish","fiber"] },
    ],
    notes:"Cook extra shrimp for a quick Wednesday lunch option.",
  },
  {
    day:"Wednesday", date:"Day 11", theme:"Fiber Day",
    morning:{ meal:"Mango Turmeric Recovery Shake", cal:300, desc:"Blend: 1 cup frozen mango, ½ tsp turmeric, ¼ tsp black pepper, 1 scoop vanilla protein, 1 tbsp chia seeds, 1 cup coconut milk.", prep:"3 min", tags:["shake","protein","fiber"] },
    lunch:{ meal:"White Bean Soup — Last of Batch", cal:340, desc:"Finish the Sunday pot. Squeeze fresh lemon, top with olive oil and whole grain bread for dipping.", prep:"0 min", tags:["protein","fiber","veg"] },
    dinners:[
      { meal:"Sesame Crusted Tuna + Quinoa Tabbouleh", cal:480, desc:"Ahi coated in sesame seeds, seared 60 sec per side. Quinoa tabbouleh: cucumber, parsley, mint, lemon, olive oil.", prep:"25 min", tags:["protein","fish","fiber"] },
      { meal:"Coconut Lime Shrimp + Black Bean Rice + Grilled Pineapple", cal:510, desc:"Shrimp marinated in coconut milk and lime, grilled or sautéed. Black bean rice with cumin. Grilled pineapple rings alongside.", prep:"25 min", tags:["protein","fish","fiber"] },
      { meal:"Baked Whole Trout + Roasted Broccolini + Lemon Herb Potatoes", cal:490, desc:"Whole trout stuffed with lemon slices, fresh herbs, garlic. Roasted at 400°F for 20 min. Broccolini and crispy lemon herb potatoes alongside.", prep:"30 min", tags:["protein","fish","fiber"] },
    ],
    notes:"Thursday grocery run — you're in the home stretch.",
  },
  {
    day:"Thursday", date:"Day 12", theme:"Home Stretch",
    morning:{ meal:"Cottage Cheese Peach Shake", cal:280, desc:"Blend: ½ cup cottage cheese, ½ cup frozen peaches, 1 tbsp honey, ½ cup almond milk, ½ tsp vanilla. ~28g protein — no powder needed.", prep:"3 min", tags:["shake","protein"] },
    lunch:{ meal:"Smoked Salmon & Cucumber Stack", cal:310, desc:"Cucumber rounds topped with whipped cream cheese, smoked salmon, capers, dill, cracked pepper. 5 min, eats like a fancy snack plate.", prep:"5 min", tags:["protein","fish","easy"] },
    dinners:[
      { meal:"Moroccan Lentil & Chickpea Stew", cal:490, desc:"Lentils and chickpeas with cumin, coriander, cinnamon, smoked paprika, canned tomatoes, veggie broth. Yogurt swirl, fresh cilantro, warm pita.", prep:"35 min", tags:["protein","fiber","veg"] },
      { meal:"Grilled Swordfish + Mango Salsa + Cilantro Rice", cal:510, desc:"Thick swordfish steak grilled with olive oil and cumin. Fresh mango salsa: mango, red onion, cilantro, lime. Cilantro-lime rice.", prep:"25 min", tags:["protein","fish"] },
      { meal:"Baked Salmon + Roasted Brussels + Farro", cal:520, desc:"Salmon with dijon honey glaze. Brussels sprouts halved and roasted until crispy at 425°F. Nutty farro as the base.", prep:"30 min", tags:["protein","fish","fiber"] },
    ],
    notes:"Make extra stew — Friday lunch is done.",
  },
  {
    day:"Friday", date:"Day 13", theme:"Strong Finish",
    morning:{ meal:"Dark Cherry Recovery Smoothie", cal:330, desc:"Blend: 1 cup frozen dark cherries, 1 scoop chocolate protein, 1 tbsp almond butter, 1 cup oat milk, 1 tsp cocoa. Rich and anti-inflammatory.", prep:"3 min", tags:["shake","protein","fiber"] },
    lunch:{ meal:"Moroccan Stew (Leftover)", cal:470, desc:"From thermos or microwaved. Drop in a pita for dipping. Always better on day 2.", prep:"0 min", tags:["protein","fiber","veg"] },
    dinners:[
      { meal:"Miso-Glazed Salmon + Roasted Asparagus + Farro", cal:530, desc:"Salmon broiled with white miso, honey, rice vinegar — deep caramelized glaze. Asparagus with lemon. Nutty farro base.", prep:"30 min", tags:["protein","fish","fiber"] },
      { meal:"Shrimp Pad Thai with Zucchini Noodles", cal:490, desc:"Zucchini noodles and shrimp in a tamarind-peanut sauce with bean sprouts, green onions, crushed peanuts, lime. Lighter than takeout.", prep:"25 min", tags:["protein","fish"] },
      { meal:"Pan-Seared Halibut + Tomato Caper Sauce + Wilted Spinach", cal:470, desc:"Halibut seared golden, finished with a bright tomato-caper sauce. Big wilted spinach with garlic alongside.", prep:"25 min", tags:["protein","fish","fiber"] },
    ],
    notes:"Two weeks almost done. Tomorrow is your celebration meal.",
  },
  {
    day:"Saturday", date:"Day 14", theme:"You Did It!",
    morning:{ meal:"Golden Milk Smoothie Bowl", cal:390, desc:"Thick blend: frozen banana, ½ tsp turmeric, ½ tsp cinnamon, 1 scoop vanilla protein, ½ cup Greek yogurt. Top with granola, mango, honey drizzle.", prep:"8 min", tags:["shake","protein","fiber"] },
    lunch:{ meal:"Burrata & White Bean Toast", cal:420, desc:"Thick whole-grain toast, smashed white beans with lemon and garlic, fresh burrata, cherry tomatoes, basil, olive oil, flaky salt.", prep:"8 min", tags:["protein","fiber","veg"] },
    dinners:[
      { meal:"Whole Roasted Sea Bass + Salsa Verde + Baby Potatoes", cal:530, desc:"Your 14-day celebration dinner. Sea bass with olive oil and herbs at 425°F. Vibrant salsa verde. Rosemary baby potatoes alongside.", prep:"45 min", tags:["protein","fish"] },
      { meal:"Butter Poached Lobster Tail + Truffle Fries + Arugula Salad", cal:590, desc:"Lobster tail gently poached in herb butter, served with oven-baked truffle fries and a light arugula salad with lemon vinaigrette.", prep:"40 min", tags:["protein","fish"] },
      { meal:"Cioppino (San Francisco Seafood Stew) + Crusty Bread", cal:520, desc:"A rich tomato broth loaded with shrimp, scallops, cod, and clams. Fennel, garlic, white wine, fresh herbs. Scoop with crusty sourdough.", prep:"45 min", tags:["protein","fish","fiber"] },
    ],
    notes:"Two full weeks! Review what felt easiest and build Week 3.",
  },
];

// ─── CLASSIC AMERICAN DATA ────────────────────────────────────────────────────
const CLASS_WEEK1 = [
  {
    day:"Sunday", date:"Day 1", theme:"Strong Start",
    morning:{ meal:"Veggie Egg Scramble + Toast", cal:390, desc:"3 eggs scrambled with baby spinach, cherry tomatoes, and feta. Side of whole grain toast with a smear of avocado. Classic done right.", prep:"10 min", tags:["protein","easy"] },
    lunch:{ meal:"Grilled Chicken Caesar Salad", cal:420, desc:"Romaine, grilled chicken breast, shaved parmesan, whole grain croutons, light Caesar dressing. Simple, filling, high protein.", prep:"10 min", tags:["protein","meat"] },
    dinners:[
      { meal:"Baked Lemon Herb Chicken Thighs + Roasted Broccoli + Sweet Potato Mash", cal:560, desc:"Chicken thighs rubbed with lemon zest, garlic, rosemary. Baked at 400°F for 35 min. Roasted broccoli and creamy sweet potato mash alongside.", prep:"40 min", tags:["protein","fiber","meat"] },
      { meal:"Air Fryer Pork Tenderloin + Green Beans + Dijon Pan Sauce", cal:520, desc:"Pork tenderloin rubbed with garlic and smoked paprika. Air fried at 400°F for 20 min. Simple dijon pan sauce. Roasted green beans.", prep:"30 min", tags:["protein","meat"] },
      { meal:"Sheet Pan Steak + Bell Peppers + Baby Potatoes", cal:590, desc:"Flank steak seasoned with garlic and herbs. Bell peppers and baby potatoes roasted on the same pan at 425°F. Chimichurri on the side.", prep:"35 min", tags:["protein","fiber","meat"] },
    ],
    notes:"Cook extra chicken tonight — it'll be Monday's lunch.",
  },
  {
    day:"Monday", date:"Day 2", theme:"Power Week",
    morning:{ meal:"Greek Yogurt Parfait", cal:340, desc:"Plain Greek yogurt + frozen berries (thawed overnight) + 1 tbsp chia seeds + low-sugar granola + drizzle of honey. Layer it up.", prep:"3 min", tags:["protein","fiber","easy"] },
    lunch:{ meal:"Leftover Chicken & Avocado Wrap", cal:430, desc:"Sunday's chicken sliced into a whole wheat tortilla with avocado, arugula, mustard, and sliced tomato. Pack and go.", prep:"4 min", tags:["protein","meat","easy"] },
    dinners:[
      { meal:"Turkey Meatballs + Zucchini Noodles + Marinara", cal:480, desc:"Lean turkey meatballs baked at 400°F. Spiralized zucchini noodles sautéed lightly. Quality jarred marinara. Lower carb, all the comfort.", prep:"35 min", tags:["protein","fiber","meat"] },
      { meal:"Baked BBQ Chicken Breast + Roasted Corn + Coleslaw", cal:510, desc:"Chicken breast brushed with clean BBQ sauce, baked at 400°F for 25 min. Roasted corn with butter and chili powder. Light Greek yogurt coleslaw.", prep:"30 min", tags:["protein","meat"] },
      { meal:"Stuffed Bell Peppers + Ground Turkey + Brown Rice + Cheese", cal:530, desc:"Halved bell peppers filled with ground turkey, brown rice, diced tomatoes, cumin. Melted cheddar on top. Bake at 375°F for 30 min.", prep:"40 min", tags:["protein","fiber","meat"] },
    ],
    notes:"Make a protein shake tonight to grab for Tuesday morning.",
  },
  {
    day:"Tuesday", date:"Day 3", theme:"Midweek Momentum",
    morning:{ meal:"PB Banana Protein Shake", cal:370, desc:"Blend: 1 frozen banana, 2 tbsp PB, 1 scoop chocolate protein, 1 tbsp ground flax, 1 cup oat milk. Grab and go. ~35g protein.", prep:"3 min", tags:["shake","protein","fiber"] },
    lunch:{ meal:"Turkey & Veggie Soup", cal:360, desc:"Batch-cook: ground turkey, diced carrots, celery, onion, chicken broth, Italian seasoning. Simmer 20 min. Pack in a thermos all week.", prep:"5 min", tags:["protein","fiber","meat"] },
    dinners:[
      { meal:"Air Fryer Salmon Bites + Roasted Asparagus + Brown Rice", cal:510, desc:"Salmon cubed, tossed in olive oil, garlic, smoked paprika. Air fry at 400°F for 8 min. Crispy outside, flaky inside. Asparagus roasted alongside.", prep:"20 min", tags:["protein","fiber","meat"] },
      { meal:"Chicken Fajita Bowl + Brown Rice + Avocado", cal:550, desc:"Chicken breast strips with sautéed bell peppers and onions, cumin, chili powder. Over brown rice with avocado, salsa, and Greek yogurt.", prep:"25 min", tags:["protein","fiber","meat"] },
      { meal:"Ground Turkey Lettuce Tacos + Mango Salsa", cal:420, desc:"Lean ground turkey in taco seasoning, served in crisp romaine cups. Fresh mango salsa, shredded cabbage, lime crema.", prep:"20 min", tags:["protein","meat"] },
    ],
    notes:"Cook extra brown rice — saves you Wednesday.",
  },
  {
    day:"Wednesday", date:"Day 4", theme:"Halfway",
    morning:{ meal:"Avocado Toast + Fried Eggs", cal:410, desc:"Thick whole-grain toast, smashed avocado with red pepper flakes and sea salt, 2 fried eggs on top. Add everything bagel seasoning.", prep:"8 min", tags:["protein","fiber"] },
    lunch:{ meal:"Turkey Soup (Leftover)", cal:350, desc:"Tuesday's soup in a thermos. Grab a piece of whole grain bread for dipping. Easy win.", prep:"0 min", tags:["protein","fiber","meat"] },
    dinners:[
      { meal:"Baked Chicken Breast + Garlic Green Beans + Quinoa", cal:490, desc:"Chicken breast marinated in olive oil, lemon, garlic, dijon. Baked at 400°F for 25 min. Green beans roasted with garlic. Fluffy quinoa.", prep:"30 min", tags:["protein","fiber","meat"] },
      { meal:"Honey Garlic Salmon + Roasted Sweet Potatoes + Broccolini", cal:530, desc:"Salmon glazed with honey, garlic, tamari. Sweet potato wedges and broccolini on same sheet pan at 425°F.", prep:"30 min", tags:["protein","fiber","meat"] },
      { meal:"Lean Beef Stir-Fry + Snap Peas + Brown Rice", cal:520, desc:"Thinly sliced sirloin stir-fried with snap peas, bell pepper, garlic, ginger in a light tamari-honey sauce. Brown rice base.", prep:"20 min", tags:["protein","fiber","meat"] },
    ],
    notes:"Thursday grocery run — check your list tonight.",
  },
  {
    day:"Thursday", date:"Day 5", theme:"Second Wind",
    morning:{ meal:"Cottage Cheese Bowl + Fruit", cal:290, desc:"1 cup cottage cheese + sliced peaches or pineapple + a sprinkle of hemp seeds and cinnamon. High protein, zero effort.", prep:"2 min", tags:["protein","easy"] },
    lunch:{ meal:"Grilled Chicken & Avocado BLT (Lightened Up)", cal:440, desc:"Whole grain bread, grilled chicken, avocado, turkey bacon, romaine, tomato, light mayo or dijon. A sandwich worth eating.", prep:"7 min", tags:["protein","meat"] },
    dinners:[
      { meal:"Air Fryer Pork Tenderloin + Roasted Sweet Potato + Sautéed Spinach", cal:520, desc:"Pork tenderloin rubbed with garlic, smoked paprika, cumin. Air fry at 400°F for 20 min. Rest and slice. Sweet potato wedges and garlicky spinach alongside.", prep:"30 min", tags:["protein","fiber","meat"] },
      { meal:"Turkey Meatloaf Muffins + Mashed Cauliflower + Green Beans", cal:490, desc:"Individual turkey meatloaf cups baked in a muffin tin. Silky mashed cauliflower with garlic and parmesan. Steamed green beans.", prep:"35 min", tags:["protein","fiber","meat"] },
      { meal:"Chicken Marsala + Roasted Fingerlings + Wilted Spinach", cal:540, desc:"Chicken breast in a light marsala wine and mushroom sauce. Crispy roasted fingerling potatoes. Wilted spinach with garlic.", prep:"30 min", tags:["protein","meat"] },
    ],
    notes:"Slice extra pork for Friday's wrap.",
  },
  {
    day:"Friday", date:"Day 6", theme:"Strong Finish",
    morning:{ meal:"Protein Pancakes", cal:380, desc:"Mix: 1 scoop protein powder, 1 banana mashed, 2 eggs. Cook like small pancakes on a lightly oiled pan. Top with Greek yogurt and berries. Weekend energy on a Friday.", prep:"10 min", tags:["protein"] },
    lunch:{ meal:"Pork & Veggie Wrap (Leftover)", cal:400, desc:"Thursday's pork in a whole wheat tortilla with arugula, roasted red peppers, and a little dijon.", prep:"3 min", tags:["protein","meat","easy"] },
    dinners:[
      { meal:"Sheet Pan Steak + Roasted Veggies + Baby Potatoes", cal:580, desc:"Flank steak seasoned with garlic, rosemary, black pepper. Roast baby potatoes and bell peppers on the same pan at 425°F. Sear steak separately for 4 min per side.", prep:"35 min", tags:["protein","fiber","meat"] },
      { meal:"Bison Burger + Sweet Potato Fries + Arugula Salad", cal:560, desc:"Lean ground bison burger on a whole grain bun with caramelized onions, lettuce, tomato. Air-fried sweet potato fries. Light arugula salad.", prep:"30 min", tags:["protein","meat"] },
      { meal:"Salmon Tacos + Cabbage Slaw + Chipotle Crema", cal:520, desc:"Blackened salmon in corn tortillas with shredded cabbage, chipotle Greek yogurt crema, avocado, fresh lime.", prep:"25 min", tags:["protein","fish"] },
    ],
    notes:"You made it through Week 1! Plan something fun for Saturday.",
  },
  {
    day:"Saturday", date:"Day 7", theme:"Weekend Reward",
    morning:{ meal:"Full Breakfast Spread", cal:480, desc:"2 eggs any style, 2 strips turkey bacon, avocado toast on thick whole grain bread, a side of mixed fruit. Take your time. You earned a real breakfast.", prep:"15 min", tags:["protein","fiber"] },
    lunch:{ meal:"Big Cobb Salad", cal:450, desc:"Romaine, grilled chicken, hard-boiled egg, avocado, cherry tomatoes, turkey bacon, blue cheese crumbles or feta. Olive oil and red wine vinegar.", prep:"10 min", tags:["protein","meat"] },
    dinners:[
      { meal:"Herb-Crusted Rack of Lamb + Chimichurri + Roasted Fingerlings", cal:620, desc:"Herb-crusted and oven-finished rack of lamb. Chimichurri: parsley, garlic, olive oil, red wine vinegar. Crispy fingerling potatoes. Your Saturday showstopper.", prep:"40 min", tags:["protein","meat"] },
      { meal:"NY Strip Steak + Truffle Butter + Roasted Asparagus + Potatoes au Gratin", cal:650, desc:"Perfectly seared NY strip with a pat of truffle butter. Asparagus roasted with lemon. Rich but lightened potatoes au gratin with Greek yogurt.", prep:"45 min", tags:["protein","meat"] },
      { meal:"Whole Roasted Chicken + Root Vegetables + Pan Gravy", cal:580, desc:"A beautifully golden whole roasted chicken with root vegetables (carrots, parsnips, onion) and a simple pan gravy. The classic Saturday dinner.", prep:"70 min", tags:["protein","fiber","meat"] },
    ],
    notes:"Week 2 starts tomorrow — grocery list prep tonight.",
  },
];

const CLASS_WEEK2 = [
  {
    day:"Sunday", date:"Day 8", theme:"Week 2 Strong",
    morning:{ meal:"Green Protein Smoothie", cal:320, desc:"Blend: 1 cup frozen spinach, 1 frozen banana, 1 scoop vanilla protein, 1 tbsp almond butter, 1 cup almond milk. ~35g protein.", prep:"3 min", tags:["shake","protein","fiber"] },
    lunch:{ meal:"Chicken & White Bean Soup (batch cook)", cal:370, desc:"Ground or diced chicken, white beans, chicken broth, celery, carrots, garlic, thyme. Big pot, eats all week.", prep:"25 min", tags:["protein","fiber","meat"] },
    dinners:[
      { meal:"Baked BBQ Chicken Thighs + Roasted Corn + Coleslaw", cal:540, desc:"Chicken thighs brushed with a clean BBQ sauce, baked at 400°F for 35 min. Roasted corn with butter and chili powder. Lightened coleslaw with Greek yogurt dressing.", prep:"40 min", tags:["protein","meat"] },
      { meal:"Slow Cooker Pulled Turkey + Brown Rice + Roasted Sweet Potato", cal:520, desc:"Turkey breast slow-cooked in BBQ and chicken broth until pull-apart tender. Shredded and served over brown rice with roasted sweet potato.", prep:"30 min", tags:["protein","fiber","meat"] },
      { meal:"Air Fryer Chicken Wings + Celery + Blue Cheese Dip", cal:560, desc:"Chicken wings tossed in garlic parmesan or hot sauce, air fried at 400°F for 22 min. Crispy, saucy, perfect for a Sunday.", prep:"30 min", tags:["protein","meat"] },
    ],
    notes:"Hard-boil 6 eggs tonight. Make overnight oats for Monday.",
  },
  {
    day:"Monday", date:"Day 9", theme:"Locked In",
    morning:{ meal:"Overnight Oats with Berries", cal:340, desc:"Made Sunday night: oats + milk + chia seeds + PB + berries on top. Grab from fridge and eat at your desk.", prep:"0 min", tags:["fiber","easy"] },
    lunch:{ meal:"Chicken & White Bean Soup (Leftover)", cal:360, desc:"Thermos or microwave. Add a squeeze of lemon on top. Gets better every day.", prep:"0 min", tags:["protein","fiber","meat"] },
    dinners:[
      { meal:"Stuffed Bell Peppers with Ground Turkey & Brown Rice", cal:530, desc:"Halved bell peppers filled with ground turkey, brown rice, diced tomatoes, cumin, chili powder. Melted cheese on top. Bake at 375°F for 30 min.", prep:"40 min", tags:["protein","fiber","meat"] },
      { meal:"Spaghetti Squash + Turkey Bolognese", cal:490, desc:"Roasted spaghetti squash topped with a rich ground turkey bolognese sauce. Parmesan finish. All the pasta comfort, half the carbs.", prep:"45 min", tags:["protein","fiber","meat"] },
      { meal:"Baked Chicken Piccata + Roasted Broccoli + Orzo", cal:510, desc:"Chicken breast in a bright lemon-caper-white wine sauce. Roasted broccoli with garlic. Light orzo tossed with olive oil and parsley.", prep:"30 min", tags:["protein","meat"] },
    ],
    notes:"Make extra turkey filling for Tuesday's lunch bowl.",
  },
  {
    day:"Tuesday", date:"Day 10", theme:"Dialed In",
    morning:{ meal:"Hard-Boiled Eggs + Apple + Almond Butter", cal:300, desc:"2 eggs from your Sunday batch + 1 apple with a side of almond butter for dipping. 30-second breakfast.", prep:"0 min", tags:["protein","easy"] },
    lunch:{ meal:"Turkey Stuffed Pepper Bowl (Leftover)", cal:410, desc:"Monday's filling over a bed of greens with hot sauce and a little extra cheese. No reheating needed.", prep:"2 min", tags:["protein","fiber","meat"] },
    dinners:[
      { meal:"Air Fryer Chicken Tenders + Sweet Potato Fries + Honey Mustard", cal:510, desc:"Chicken tenders breaded in panko and parmesan, air fried at 400°F for 12 min. Sweet potato fries alongside. Honey dijon dipping sauce.", prep:"25 min", tags:["protein","meat"] },
      { meal:"Lean Beef Tacos + Black Beans + Avocado + Pico", cal:530, desc:"Seasoned lean ground beef in warm corn tortillas. Black beans, fresh pico de gallo, avocado, Greek yogurt crema.", prep:"20 min", tags:["protein","fiber","meat"] },
      { meal:"Turkey Chili + Cornbread + Greek Yogurt", cal:550, desc:"Hearty turkey chili with kidney beans, diced tomatoes, cumin, chipotle. Served with a slice of lightened cornbread and Greek yogurt instead of sour cream.", prep:"35 min", tags:["protein","fiber","meat"] },
    ],
    notes:"You're over halfway — keep it going.",
  },
  {
    day:"Wednesday", date:"Day 11", theme:"Fiber Focus",
    morning:{ meal:"Avocado Toast + Soft-Boiled Egg", cal:400, desc:"Whole grain toast with smashed avocado, everything bagel seasoning, and a soft-boiled egg on top. Sprinkle of chili flakes.", prep:"7 min", tags:["protein","fiber"] },
    lunch:{ meal:"Chicken & White Bean Soup — Last of Batch", cal:360, desc:"Finish the Sunday pot. Add fresh parsley and a drizzle of olive oil. Whole grain crackers on the side.", prep:"0 min", tags:["protein","fiber","meat"] },
    dinners:[
      { meal:"Baked Salmon + Quinoa + Roasted Brussels Sprouts", cal:530, desc:"Salmon with dijon, honey, and lemon. Brussels sprouts halved and roasted at 425°F until crispy. Fluffy quinoa base.", prep:"30 min", tags:["protein","fiber","meat"] },
      { meal:"Chicken Stir-Fry + Broccoli + Snap Peas + Brown Rice", cal:490, desc:"Chicken breast strips stir-fried with broccoli, snap peas, bell pepper in a light ginger-tamari sauce. Brown rice base.", prep:"20 min", tags:["protein","fiber","meat"] },
      { meal:"Ground Turkey & Zucchini Boats + Parmesan Crust", cal:460, desc:"Zucchini halves filled with seasoned ground turkey, diced tomatoes, and mozzarella. Baked at 400°F until bubbly.", prep:"30 min", tags:["protein","fiber","meat"] },
    ],
    notes:"Thursday grocery run — nearly there!",
  },
  {
    day:"Thursday", date:"Day 12", theme:"Home Stretch",
    morning:{ meal:"Banana Protein Shake", cal:330, desc:"Blend: 1 frozen banana, 1 scoop vanilla protein, 1 tbsp PB, 1 cup milk. Classic, fast, ~30g protein.", prep:"3 min", tags:["shake","protein","easy"] },
    lunch:{ meal:"Turkey & Avocado Club Sandwich", cal:450, desc:"Whole grain bread, sliced turkey, avocado, romaine, tomato, turkey bacon, dijon. Slice in half. Eat like a proper lunch.", prep:"5 min", tags:["protein","meat","easy"] },
    dinners:[
      { meal:"Baked Pork Chops + Apple Slaw + Roasted Sweet Potato", cal:540, desc:"Thick pork chops rubbed with garlic and smoked paprika, baked at 400°F for 20 min. Fresh apple slaw with red cabbage, apple, lemon, olive oil. Sweet potato wedges.", prep:"35 min", tags:["protein","fiber","meat"] },
      { meal:"Chicken Thighs + White Bean Ragù + Wilted Greens", cal:510, desc:"Seared chicken thighs over white bean ragù: beans, garlic, broth, sage, tomatoes. A mountain of wilted greens with olive oil.", prep:"35 min", tags:["protein","fiber","meat"] },
      { meal:"Sirloin Steak + Roasted Mushrooms + Garlic Mashed Cauliflower", cal:530, desc:"Seared sirloin steak finished in the oven. Roasted mushrooms with thyme and butter. Creamy garlic mashed cauliflower with parmesan.", prep:"30 min", tags:["protein","meat"] },
    ],
    notes:"Save one pork chop for Friday's lunch.",
  },
  {
    day:"Friday", date:"Day 13", theme:"Final Push",
    morning:{ meal:"Greek Yogurt Bowl with Granola & Banana", cal:320, desc:"Plain Greek yogurt, sliced banana, low-sugar granola, drizzle of honey. Quick and protein packed.", prep:"2 min", tags:["protein","easy"] },
    lunch:{ meal:"Pork Chop Salad (Leftover)", cal:390, desc:"Slice leftover pork over a big bowl of arugula, cherry tomatoes, cucumber, and feta. Olive oil and lemon dressing.", prep:"4 min", tags:["protein","meat","easy"] },
    dinners:[
      { meal:"Air Fryer Chicken Wings + Celery Sticks + Blue Cheese Dip", cal:560, desc:"Chicken wings tossed in a clean hot sauce or garlic parmesan, air fried at 400°F for 22 min. Crispy, saucy, and honestly perfect for a Friday.", prep:"30 min", tags:["protein","meat"] },
      { meal:"Grilled Salmon + Cucumber Dill Salad + Lemon Rice", cal:520, desc:"Salmon grilled with lemon and herbs. Cool cucumber dill salad with red onion and Greek yogurt. Fluffy lemon rice.", prep:"25 min", tags:["protein","fish"] },
      { meal:"Turkey Meatball Sub + Roasted Peppers + Arugula", cal:540, desc:"Turkey meatballs in marinara on a whole grain hoagie with mozzarella, roasted peppers, and arugula. Broiled until bubbly.", prep:"30 min", tags:["protein","meat"] },
    ],
    notes:"One day left — make it count.",
  },
  {
    day:"Saturday", date:"Day 14", theme:"Celebration!",
    morning:{ meal:"Full Egg & Veggie Frittata", cal:420, desc:"6 eggs whisked with baby spinach, cherry tomatoes, goat cheese or feta, and fresh herbs. Pour into oven-safe skillet, bake at 375°F for 18 min. Slice like a pizza.", prep:"25 min", tags:["protein","fiber"] },
    lunch:{ meal:"Big Protein Power Salad", cal:470, desc:"Mixed greens + hard-boiled eggs + grilled chicken + avocado + quinoa + roasted chickpeas + tahini lemon dressing. The most satisfying salad you'll have.", prep:"10 min", tags:["protein","fiber","meat"] },
    dinners:[
      { meal:"Celebration Ribeye + Truffle Butter + Crispy Fingerlings + Creamed Spinach", cal:680, desc:"A beautifully seared ribeye with truffle butter. Crispy fingerlings. Rich (lightened) creamed spinach made with Greek yogurt. You earned every bite.", prep:"40 min", tags:["protein","meat"] },
      { meal:"Whole Roasted Chicken + Roasted Root Vegetables + Pan Gravy", cal:590, desc:"Golden whole roasted chicken with root vegetables and a simple pan gravy. Roasted carrots, parsnips, and onions alongside.", prep:"70 min", tags:["protein","fiber","meat"] },
      { meal:"Surf & Turf — Filet Mignon + Butter Shrimp + Asparagus", cal:650, desc:"Petite filet seared to your liking. Garlic butter shrimp alongside. Asparagus roasted with lemon. The ultimate celebration plate.", prep:"35 min", tags:["protein","fish","meat"] },
    ],
    notes:"Two full weeks of Classic American done. Plan Week 3!",
  },
];

// ─── MEDITERRANEAN DATA ───────────────────────────────────────────────────────
const MED_WEEK1 = [
  {
    day:"Sunday", date:"Day 1", theme:"Mediterranean Start",
    morning:{ meal:"Greek Yogurt with Honey, Walnuts & Figs", cal:310, desc:"Plain Greek yogurt topped with a drizzle of honey, a handful of walnuts, and sliced fresh or dried figs. A true Mediterranean breakfast.", prep:"3 min", tags:["protein","fiber","med"] },
    lunch:{ meal:"Classic Hummus & Veggie Plate + Pita", cal:380, desc:"Store-bought or homemade hummus, cucumber slices, cherry tomatoes, kalamata olives, roasted red peppers, whole wheat pita triangles.", prep:"5 min", tags:["protein","fiber","veg","med"] },
    dinners:[
      { meal:"Baked Sea Bass + Roasted Tomatoes + Herbed Couscous", cal:490, desc:"Sea bass fillets with olive oil, lemon, and fresh thyme. Roasted cherry tomatoes alongside. Herbed couscous with parsley, mint, and lemon zest.", prep:"30 min", tags:["protein","fish","med"] },
      { meal:"Grilled Branzino + Salsa Verde + Roasted Fennel + Farro", cal:510, desc:"Whole branzino or fillets grilled with olive oil and lemon. Bright salsa verde: parsley, capers, garlic, lemon. Fennel roasted alongside. Nutty farro.", prep:"35 min", tags:["protein","fish","fiber","med"] },
      { meal:"Shrimp Saganaki + Crusty Bread + Arugula Salad", cal:470, desc:"Shrimp simmered in spiced tomato sauce with feta melted on top. Scoop with crusty whole grain bread. Arugula salad with lemon and olive oil.", prep:"25 min", tags:["protein","fish","med"] },
    ],
    notes:"Hard-boil 6 eggs tonight for the week.",
  },
  {
    day:"Monday", date:"Day 2", theme:"Fuel Up",
    morning:{ meal:"Green Protein Smoothie", cal:310, desc:"Blend: 1 cup spinach, ½ cucumber, 1 scoop vanilla protein, 1 tbsp tahini, 1 cup almond milk, juice of ½ lemon. Earthy, fresh, ~32g protein.", prep:"3 min", tags:["shake","protein","fiber","med"] },
    lunch:{ meal:"Lentil & Roasted Veggie Salad", cal:390, desc:"Green lentils, roasted zucchini and red pepper, cherry tomatoes, fresh parsley, crumbled feta, lemon-olive oil dressing.", prep:"5 min", tags:["protein","fiber","veg","med"] },
    dinners:[
      { meal:"Grilled Chicken Souvlaki + Tzatziki + Greek Salad", cal:500, desc:"Chicken marinated in lemon, garlic, olive oil, and oregano. Grilled or baked. Served with tzatziki (Greek yogurt, cucumber, dill) and a classic Greek salad.", prep:"30 min", tags:["protein","med"] },
      { meal:"Lamb Kofta + Herbed Yogurt + Tabbouleh", cal:530, desc:"Ground lamb formed into kebabs with cumin, coriander, garlic. Grilled or broiled. Cool herbed yogurt sauce. Fresh tabbouleh: parsley, bulgur, lemon.", prep:"30 min", tags:["protein","fiber","med"] },
      { meal:"Baked Salmon + Chermoula + Roasted Carrots + Couscous", cal:510, desc:"Salmon topped with chermoula (cilantro, cumin, garlic, lemon, olive oil). Roasted carrots with cumin. Couscous with parsley.", prep:"30 min", tags:["protein","fish","fiber","med"] },
    ],
    notes:"Make extra chicken for Tuesday's lunch wrap.",
  },
  {
    day:"Tuesday", date:"Day 3", theme:"Steady",
    morning:{ meal:"Soft-Boiled Eggs + Cucumber, Tomato & Olive Plate", cal:290, desc:"2 soft-boiled eggs, sliced cucumber, halved cherry tomatoes, a few olives, drizzle of olive oil, pinch of za'atar. How the Mediterranean does breakfast.", prep:"5 min", tags:["protein","med"] },
    lunch:{ meal:"Chicken Souvlaki Wrap (Leftover)", cal:400, desc:"Monday's chicken in a warm whole wheat pita with tzatziki, shredded romaine, sliced tomato, and red onion.", prep:"3 min", tags:["protein","med","easy"] },
    dinners:[
      { meal:"Shrimp Saganaki + Crusty Bread + Arugula Salad", cal:470, desc:"Shrimp simmered in a spiced tomato sauce with feta melted on top. Scoop with crusty whole grain bread. Simple arugula salad with lemon and olive oil alongside.", prep:"25 min", tags:["protein","fish","med"] },
      { meal:"Seared Tuna Steak + Olive Tapenade + Farro + Roasted Broccolini", cal:500, desc:"Ahi tuna seared 90 sec per side. Olive tapenade spooned on top. Nutty farro and roasted broccolini alongside.", prep:"25 min", tags:["protein","fish","fiber","med"] },
      { meal:"Chicken Shawarma Bowl + Brown Rice + Fattoush Salad", cal:520, desc:"Chicken marinated in shawarma spices (cumin, paprika, turmeric, cinnamon). Roasted and sliced over brown rice. Fattoush: tomatoes, cucumbers, radishes, crispy pita.", prep:"35 min", tags:["protein","fiber","med"] },
    ],
    notes:"Cook extra shrimp — add to Wednesday's grain bowl.",
  },
  {
    day:"Wednesday", date:"Day 4", theme:"Halfway",
    morning:{ meal:"Banana Tahini Protein Shake", cal:330, desc:"Blend: 1 frozen banana, 1 tbsp tahini, 1 scoop vanilla protein, 1 tsp honey, 1 cup oat milk, pinch of cinnamon. Nutty, smooth, satisfying.", prep:"3 min", tags:["shake","protein","med"] },
    lunch:{ meal:"Shrimp & Farro Grain Bowl", cal:410, desc:"Farro base, leftover shrimp, cucumber, cherry tomatoes, kalamata olives, fresh parsley, lemon-olive oil dressing.", prep:"5 min", tags:["protein","fiber","fish","med"] },
    dinners:[
      { meal:"Baked Lemon Oregano Chicken + White Beans + Roasted Zucchini", cal:500, desc:"Chicken thighs with lemon, oregano, and olive oil. White beans simmered with garlic and rosemary. Zucchini roasted until golden.", prep:"35 min", tags:["protein","fiber","med"] },
      { meal:"Sea Bass en Papillote + Capers + Cherry Tomatoes + Olives", cal:470, desc:"Sea bass cooked in parchment with olive oil, lemon, capers, cherry tomatoes, and olives. Steam-roasted at 400°F for 18 min. Zero mess.", prep:"25 min", tags:["protein","fish","med"] },
      { meal:"Moussaka (Lightened) + Greek Salad", cal:540, desc:"Layers of roasted eggplant, spiced ground lamb, and lightened béchamel made with Greek yogurt. Baked until golden. Full Greek salad alongside.", prep:"55 min", tags:["protein","fiber","med"] },
    ],
    notes:"Thursday grocery run — check your list tonight.",
  },
  {
    day:"Thursday", date:"Day 5", theme:"Second Wind",
    morning:{ meal:"Ricotta Toast with Honey & Pistachios", cal:350, desc:"Thick whole grain toast, spread with part-skim ricotta, drizzle of honey, crushed pistachios, and a sprinkle of orange zest. Elegant and high protein.", prep:"4 min", tags:["protein","med"] },
    lunch:{ meal:"Tuna Niçoise Salad", cal:400, desc:"Canned tuna, hard-boiled egg, green beans, cherry tomatoes, kalamata olives, cucumber. Dijon vinaigrette. A full French-Mediterranean classic.", prep:"8 min", tags:["protein","fiber","fish","med"] },
    dinners:[
      { meal:"Salmon with Olive Tapenade + Roasted Cauliflower + Quinoa", cal:510, desc:"Salmon topped with olive tapenade (jarred or homemade). Roasted cauliflower with turmeric and cumin. Fluffy quinoa. Bold, low fat, very high protein.", prep:"30 min", tags:["protein","fish","fiber","med"] },
      { meal:"Grilled Octopus + White Bean Salad + Lemon Oil", cal:480, desc:"Octopus grilled until charred and tender. White bean salad with celery, parsley, lemon, olive oil. A stunning and simple Mediterranean classic.", prep:"40 min", tags:["protein","fish","fiber","med"] },
      { meal:"Chicken & Lentil Soup + Crusty Bread", cal:460, desc:"Hearty soup with chicken thighs, green lentils, tomatoes, cumin, coriander, and lemon. A deeply nourishing Mediterranean bowl.", prep:"40 min", tags:["protein","fiber","med"] },
    ],
    notes:"Make extra quinoa for Friday.",
  },
  {
    day:"Friday", date:"Day 6", theme:"Strong Finish",
    morning:{ meal:"Strawberry Mint Protein Smoothie", cal:320, desc:"Blend: 1 cup frozen strawberries, 4–5 mint leaves, 1 cup Greek yogurt, 1 scoop vanilla protein, ½ cup almond milk. Bright and refreshing. ~38g protein.", prep:"3 min", tags:["shake","protein","med"] },
    lunch:{ meal:"Quinoa Tabbouleh + Falafel", cal:410, desc:"Quinoa tabbouleh: quinoa, parsley, mint, cucumber, cherry tomatoes, lemon, olive oil. Quality store-bought falafel. Drizzle tahini on everything.", prep:"5 min", tags:["protein","fiber","veg","med"] },
    dinners:[
      { meal:"Whole Baked Branzino + Roasted Root Veggies + Tzatziki", cal:510, desc:"Whole branzino stuffed with lemon and rosemary, roasted at 425°F for 20 min. Root veggies (carrots, parsnips) alongside. Tzatziki for dipping.", prep:"35 min", tags:["protein","fish","med"] },
      { meal:"Grilled Swordfish + Salsa Verde + Baby Potatoes + Greek Salad", cal:530, desc:"Thick swordfish steak grilled or broiled, topped with bright salsa verde. Crispy roasted baby potatoes. A classic Greek salad alongside.", prep:"30 min", tags:["protein","fish","med"] },
      { meal:"Pan-Seared Cod + Romesco Sauce + Roasted Asparagus + Farro", cal:490, desc:"Cod seared golden. Romesco sauce: roasted red peppers, almonds, garlic, olive oil. Asparagus roasted alongside. Nutty farro base.", prep:"30 min", tags:["protein","fish","fiber","med"] },
    ],
    notes:"Two weeks almost done — you should feel great.",
  },
  {
    day:"Saturday", date:"Day 7", theme:"Weekend",
    morning:{ meal:"Mediterranean Egg Bake", cal:380, desc:"Eggs baked in a skillet with sautéed spinach, cherry tomatoes, crumbled feta, and za'atar. Serve with warm pita. A slow Saturday ritual.", prep:"20 min", tags:["protein","med"] },
    lunch:{ meal:"Big Mezze Plate", cal:430, desc:"Hummus, baba ganoush, stuffed grape leaves, cucumber, tomatoes, olives, pita. Graze, share, enjoy. The Mediterranean way of eating.", prep:"5 min", tags:["protein","fiber","veg","med"] },
    dinners:[
      { meal:"Lamb Kofta + Grilled Vegetables + Herbed Yogurt Sauce", cal:540, desc:"Ground lamb mixed with cumin, coriander, garlic, formed into kebabs, grilled or broiled. Grilled zucchini, eggplant, red pepper alongside. Cool herbed yogurt dipping sauce.", prep:"35 min", tags:["protein","med"] },
      { meal:"Paella — Saffron Rice + Shrimp + Mussels + Chicken", cal:580, desc:"Classic paella with saffron-scented rice, shrimp, mussels, chicken, peas, roasted red peppers. A proper Saturday showstopper.", prep:"50 min", tags:["protein","fish","fiber","med"] },
      { meal:"Braised Short Ribs + Gremolata + Polenta", cal:620, desc:"Red wine-braised short ribs, fall-apart tender. Gremolata: parsley, lemon zest, garlic. Creamy polenta base. Italian Mediterranean at its finest.", prep:"2 hrs", tags:["protein","med"] },
    ],
    notes:"Week 2 tomorrow — prep your grocery list tonight.",
  },
];

const MED_WEEK2 = [
  {
    day:"Sunday", date:"Day 8", theme:"Week 2 Begin",
    morning:{ meal:"Walnut Date Protein Shake", cal:320, desc:"Blend: 2 Medjool dates (pitted), 1 tbsp walnut butter or walnuts, 1 scoop vanilla protein, 1 cup almond milk, ½ tsp cinnamon. Naturally sweet, ~33g protein.", prep:"3 min", tags:["shake","protein","med"] },
    lunch:{ meal:"White Bean & Tomato Soup (batch cook)", cal:350, desc:"White beans, canned tomatoes, veggie broth, garlic, rosemary, olive oil. Simmer 20 min. Finish with lemon juice. Eats all week.", prep:"25 min", tags:["protein","fiber","veg","med"] },
    dinners:[
      { meal:"Herb-Baked Chicken + Roasted Eggplant + Bulgur Wheat", cal:510, desc:"Chicken thighs with herbes de Provence and lemon. Roasted eggplant with olive oil. Bulgur wheat with parsley and mint. A true Mediterranean Sunday.", prep:"40 min", tags:["protein","fiber","med"] },
      { meal:"Baked Whole Trout + Roasted Peppers + Herbed Couscous", cal:490, desc:"Whole trout stuffed with lemon, herbs, and garlic. Roasted at 400°F for 20 min. Roasted peppers and herbed couscous alongside.", prep:"30 min", tags:["protein","fish","fiber","med"] },
      { meal:"Chicken Tagine + Preserved Lemon + Olives + Couscous", cal:540, desc:"Chicken slow-braised with preserved lemon, olives, saffron, ginger, and coriander. Fluffy couscous to soak it all up. Quintessential Moroccan.", prep:"50 min", tags:["protein","fiber","med"] },
    ],
    notes:"Hard-boil 6 eggs and prep tomorrow's overnight oats.",
  },
  {
    day:"Monday", date:"Day 9", theme:"Locked In",
    morning:{ meal:"Fig & Almond Overnight Oats", cal:370, desc:"Made Sunday night: oats + almond milk + chia seeds + almond butter + sliced dried figs on top. Grab from fridge. A Mediterranean take on overnight oats.", prep:"0 min", tags:["fiber","med","easy"] },
    lunch:{ meal:"White Bean Soup (from Sunday)", cal:340, desc:"Thermos or microwave. Drizzle of olive oil and fresh parsley on top. Better every day.", prep:"0 min", tags:["protein","fiber","veg","med"] },
    dinners:[
      { meal:"Pan-Seared Salmon + Caponata + Farro", cal:540, desc:"Salmon seared in olive oil, finished with lemon. Caponata: eggplant, tomatoes, olives, capers, red wine vinegar — sweet and sour Sicilian classic. Nutty farro underneath.", prep:"35 min", tags:["protein","fish","fiber","med"] },
      { meal:"Grilled Tuna + Sicilian Olive Relish + White Beans + Arugula", cal:510, desc:"Ahi tuna grilled to medium rare. Sicilian olive relish: green and black olives, capers, lemon. White beans and arugula alongside.", prep:"25 min", tags:["protein","fish","fiber","med"] },
      { meal:"Chicken Marsala + Roasted Fingerlings + Wilted Spinach", cal:530, desc:"Chicken breast in a light marsala wine and mushroom sauce. Crispy fingerling potatoes. Wilted spinach with garlic and olive oil.", prep:"30 min", tags:["protein","med"] },
    ],
    notes:"Make extra caponata — it gets better overnight.",
  },
  {
    day:"Tuesday", date:"Day 10", theme:"Dialed",
    morning:{ meal:"Hard-Boiled Eggs + Za'atar Labneh + Pita", cal:340, desc:"2 hard-boiled eggs + store-bought labneh (or thick Greek yogurt) drizzled with olive oil and za'atar + warm pita triangles. Authentic and fast.", prep:"3 min", tags:["protein","med"] },
    lunch:{ meal:"Caponata & Farro Bowl (Leftover)", cal:400, desc:"Monday's leftover farro and caponata over arugula with a squeeze of lemon. Add a hard-boiled egg for extra protein.", prep:"3 min", tags:["protein","fiber","fish","med"] },
    dinners:[
      { meal:"Shrimp & Orzo with Spinach, Lemon & Feta", cal:490, desc:"Shrimp cooked with garlic and white wine. Toss with cooked orzo, baby spinach, lemon juice, and crumbled feta. Light but filling.", prep:"25 min", tags:["protein","fish","med"] },
      { meal:"Baked Cod + Tomato & Olive Sauce + Roasted Cauliflower", cal:460, desc:"Cod baked in a rich tomato sauce with kalamata olives, capers, garlic, and white wine. Roasted cauliflower alongside.", prep:"30 min", tags:["protein","fish","med"] },
      { meal:"Lemon Herb Chicken + White Bean Ragù + Wilted Greens", cal:510, desc:"Seared chicken thighs over white bean ragù with garlic, rosemary, and sage. A mountain of wilted greens with olive oil and lemon.", prep:"35 min", tags:["protein","fiber","med"] },
    ],
    notes:"Cook extra orzo for Wednesday's lunch.",
  },
  {
    day:"Wednesday", date:"Day 11", theme:"Fiber Day",
    morning:{ meal:"Mango Cardamom Smoothie", cal:310, desc:"Blend: 1 cup frozen mango, ¼ tsp cardamom, 1 scoop vanilla protein, 1 cup Greek yogurt, ½ cup almond milk. Fragrant, exotic, ~36g protein.", prep:"3 min", tags:["shake","protein","med"] },
    lunch:{ meal:"White Bean Soup — Last of Batch", cal:340, desc:"Finish the Sunday pot. Add a drizzle of good olive oil and crusty bread for dipping.", prep:"0 min", tags:["protein","fiber","veg","med"] },
    dinners:[
      { meal:"Baked Cod with Chermoula + Roasted Carrots + Couscous", cal:480, desc:"Cod fillets topped with chermoula (cilantro, cumin, garlic, lemon, olive oil). Roasted carrots with cumin. Couscous fluffed with lemon and parsley.", prep:"30 min", tags:["protein","fish","fiber","med"] },
      { meal:"Salmon en Papillote + Asparagus + Herbed Quinoa", cal:500, desc:"Salmon cooked in parchment with lemon, dill, capers, and white wine. Asparagus alongside. Herbed quinoa with parsley and mint.", prep:"25 min", tags:["protein","fish","fiber","med"] },
      { meal:"Stuffed Eggplant with Lamb & Pine Nuts + Greek Salad", cal:530, desc:"Eggplant halves roasted, filled with spiced ground lamb, pine nuts, tomatoes, and fresh herbs. Baked until golden. Full Greek salad alongside.", prep:"45 min", tags:["protein","fiber","med"] },
    ],
    notes:"Thursday grocery run — almost done!",
  },
  {
    day:"Thursday", date:"Day 12", theme:"Home Stretch",
    morning:{ meal:"Cottage Cheese + Roasted Peppers + Olive Oil Toast", cal:330, desc:"Whole grain toast spread with cottage cheese, topped with jarred roasted red peppers, a drizzle of olive oil, and fresh basil. Mediterranean bruschetta.", prep:"4 min", tags:["protein","med"] },
    lunch:{ meal:"Falafel & Tabbouleh Plate", cal:420, desc:"Quality store-bought falafel, classic tabbouleh (parsley, bulgur, tomatoes, mint, lemon), hummus, pita. Fast Mediterranean feast.", prep:"5 min", tags:["protein","fiber","veg","med"] },
    dinners:[
      { meal:"Lemon Rosemary Chicken Thighs + White Bean Ragù + Wilted Greens", cal:510, desc:"Chicken thighs with lemon and rosemary. White bean ragù: beans, garlic, broth, sage. A mountain of wilted greens with olive oil. Rustic and beautiful.", prep:"40 min", tags:["protein","fiber","med"] },
      { meal:"Grilled Shrimp Skewers + Roasted Red Pepper Sauce + Couscous", cal:470, desc:"Shrimp marinated in lemon, garlic, and herbs. Grilled on skewers. Roasted red pepper sauce. Fluffy couscous alongside.", prep:"25 min", tags:["protein","fish","med"] },
      { meal:"Braised Lamb Shanks + Gremolata + White Beans + Crusty Bread", cal:590, desc:"Lamb shanks braised in red wine, tomatoes, and rosemary until fall-apart tender. Gremolata: parsley, lemon zest, garlic. White beans and bread to soak the sauce.", prep:"2 hrs", tags:["protein","fiber","med"] },
    ],
    notes:"Make extra chicken and beans for Friday's lunch.",
  },
  {
    day:"Friday", date:"Day 13", theme:"Strong Finish",
    morning:{ meal:"Dark Cherry Protein Smoothie", cal:320, desc:"Blend: 1 cup frozen dark cherries, 1 scoop chocolate protein, 1 tbsp tahini, 1 cup oat milk. Rich, anti-inflammatory, ~33g protein.", prep:"3 min", tags:["shake","protein","med"] },
    lunch:{ meal:"Chicken & White Bean Salad (Leftover)", cal:390, desc:"Thursday's chicken shredded over arugula with white beans, cherry tomatoes, olives, lemon-olive oil dressing.", prep:"4 min", tags:["protein","fiber","med","easy"] },
    dinners:[
      { meal:"Grilled Swordfish + Salsa Verde + Roasted Potatoes + Greek Salad", cal:530, desc:"Thick swordfish steak grilled or broiled, topped with bright salsa verde. Crispy roasted baby potatoes. A classic Greek salad alongside. A Friday dinner worth staying in for.", prep:"30 min", tags:["protein","fish","med"] },
      { meal:"Sea Bass + Pistachio Crust + Roasted Fennel + Lemon Quinoa", cal:510, desc:"Sea bass fillets coated in crushed pistachios and herbs, baked at 400°F. Roasted fennel and lemon quinoa alongside.", prep:"30 min", tags:["protein","fish","fiber","med"] },
      { meal:"Oven-Baked Chicken Kofta + Tzatziki + Warm Pita + Fattoush", cal:520, desc:"Ground chicken kofta balls baked at 400°F with Mediterranean spices. Creamy tzatziki, warm pita, and a bright fattoush salad.", prep:"30 min", tags:["protein","fiber","med"] },
    ],
    notes:"One day left — your celebration dinner tomorrow.",
  },
  {
    day:"Saturday", date:"Day 14", theme:"Celebration!",
    morning:{ meal:"Shakshuka with Feta & Crusty Bread", cal:420, desc:"Eggs poached in a spiced tomato and pepper sauce. Crumble feta on top. Scoop with crusty whole grain bread. A celebratory Mediterranean brunch.", prep:"25 min", tags:["protein","med"] },
    lunch:{ meal:"Grand Mezze Spread", cal:460, desc:"Hummus, baba ganoush, labneh, stuffed grape leaves, pita, crudités, olives. The full Mediterranean experience. Take your time.", prep:"10 min", tags:["protein","fiber","veg","med"] },
    dinners:[
      { meal:"Slow-Roasted Leg of Lamb + Roasted Root Vegetables + Tzatziki", cal:620, desc:"Your 14-day celebration. Leg of lamb marinated in garlic, lemon, rosemary, olive oil. Slow-roasted until fall-apart tender. Root vegetables alongside. Big bowl of tzatziki. The Mediterranean table at its finest.", prep:"2 hrs", tags:["protein","med"] },
      { meal:"Whole Roasted Sea Bass + Lemon Herb Oil + Grilled Vegetables + Farro", cal:560, desc:"Celebration whole sea bass roasted with olive oil, lemon, and fresh herbs. Grilled seasonal vegetables. Nutty farro. A stunning final dinner.", prep:"40 min", tags:["protein","fish","fiber","med"] },
      { meal:"Lobster & Shrimp Paella + Saffron + Roasted Peppers + Peas", cal:600, desc:"A grand celebration paella with lobster, shrimp, saffron rice, roasted red peppers, and peas. The ultimate Mediterranean feast to close two weeks.", prep:"55 min", tags:["protein","fish","fiber","med"] },
    ],
    notes:"14 days of Mediterranean done. You look and feel different.",
  },
];

// ─── GROCERY LISTS ─────────────────────────────────────────────────────────────
const GROCERIES = {
  pescatarian: {
    sun1:{ title:"Pescatarian — Week 1, Days 1–4", sections:[
      { cat:"Fish & Seafood", icon:"🐟", items:["3 salmon fillets","2 cod fillets","1 lb shrimp (frozen, peeled)","Canned albacore tuna (2 cans)","Sushi-grade ahi tuna (2 steaks)","Scallops (½ lb, optional)"] },
      { cat:"Produce", icon:"🥦", items:["2 sweet potatoes","1 head broccolini","1 bag baby spinach","1 bag romaine","Cherry tomatoes (1 pint)","2 cucumbers","Shredded purple cabbage","Shredded carrots","2 avocados","3 limes","2 lemons","3 bananas (freeze 2)","Frozen mango","Frozen pineapple","Frozen mixed berries","Frozen blueberries","Arugula"] },
      { cat:"Protein & Dairy", icon:"🥛", items:["Plain Greek yogurt (32 oz)","Feta cheese (crumbled)","Parmesan","Vanilla + chocolate protein powder"] },
      { cat:"Pantry", icon:"🫙", items:["Canned white beans (3 cans)","Canned black beans (2 cans)","Canned chickpeas (2 cans)","Brown rice","Quinoa","Cauliflower rice (frozen)","Whole wheat tortillas","Corn tortillas","Ground flax","Chia seeds","Hemp seeds","Almond butter","Almond milk","Oat milk","Coconut water","Matcha powder","Cocoa powder","Tahini","White miso paste","Tamari","Rice vinegar","Sesame oil","Honey","Everything bagel seasoning","Low-sugar granola","Capers (jar)","Roasted red peppers (jar)","Enchilada sauce","Whole grain crackers"] },
    ]},
    thu1:{ title:"Pescatarian — Week 1, Days 5–7", sections:[
      { cat:"Fish & Seafood", icon:"🐟", items:["2 ahi tuna steaks","2 whole branzino (or fillets)","1 lb scallops (for celebration option)","Lobster tails (optional)","Halibut fillets (2)"] },
      { cat:"Produce", icon:"🥦", items:["Frozen açaí packets (2–4)","Extra bananas","Fresh basil","Fresh parsley","Fresh mint","Kalamata olives","Red onion","Extra cherry tomatoes","Extra avocado","Edamame (frozen, shelled)","1 fennel bulb","Beets (roasted)"] },
      { cat:"Protein & Dairy", icon:"🥛", items:["More Greek yogurt if needed","Miso soup packets","Burrata (for Saturday option)"] },
      { cat:"Pantry", icon:"🫙", items:["Mirin","Pickled ginger","Red wine vinegar","Sesame seeds","Whole grain bread","Farro","More oat milk if needed","Coconut milk (can)"] },
    ]},
    sun2:{ title:"Pescatarian — Week 2, Days 8–11", sections:[
      { cat:"Fish & Seafood", icon:"🐟", items:["3 salmon fillets","1 lb shrimp (frozen)","2 ahi tuna steaks","Canned albacore tuna (2 cans)","2 cod fillets","Whole trout (optional)"] },
      { cat:"Produce", icon:"🥦", items:["2 heads bok choy","4 large bell peppers","1 bunch kale","Baby spinach","Cherry tomatoes","2 cucumbers","Fresh parsley (2 bunches)","Fresh mint","2 lemons","3 limes","Extra bananas","Frozen strawberries","Frozen mango","Frozen peaches","Diced tomatoes (2 cans)","Snap peas"] },
      { cat:"Protein & Dairy", icon:"🥛", items:["Plain Greek yogurt (32 oz)","Feta (block)","Parmesan","Cottage cheese (16 oz)","Cream cheese (4 oz)","1 dozen eggs"] },
      { cat:"Pantry", icon:"🫙", items:["Green or brown lentils (1 lb)","Farro","Chickpea pasta (1 box)","Vegetable broth (32 oz)","Chickpeas (2 cans)","White beans (2 cans)","Mirin","Turmeric","Smoked paprika","Cinnamon","Coriander","Whole grain pita","Coconut milk","Ramen noodles (2 packs)","Nori sheets","Olive tapenade (jar)"] },
    ]},
    thu2:{ title:"Pescatarian — Week 2, Days 12–14", sections:[
      { cat:"Fish & Seafood", icon:"🐟", items:["2 salmon fillets","Smoked salmon (4 oz)","1–2 whole sea bass","2 halibut fillets","Lobster tails (optional celebration)","Mixed shellfish for cioppino (shrimp, scallops, clams)"] },
      { cat:"Produce", icon:"🥦", items:["1 bunch asparagus","Baby potatoes","Fresh rosemary + thyme","Fresh cilantro","Extra cherry tomatoes","Frozen dark cherries","More bananas","Fresh mango","Fingerling potatoes"] },
      { cat:"Protein & Dairy", icon:"🥛", items:["More Greek yogurt","Whipped cream cheese","Burrata (1–2 balls)"] },
      { cat:"Pantry", icon:"🫙", items:["More capers","More miso paste","More honey","More granola","Hemp seeds","Olive oil (if low)","Flaky sea salt","San Marzano tomatoes (for cioppino)","White wine (dry, for cooking)"] },
    ]},
  },

  classic: {
    sun1:{ title:"Classic American — Week 1, Days 1–4", sections:[
      { cat:"Meat & Protein", icon:"🥩", items:["6 bone-in chicken thighs","2 chicken breasts","1 lb ground turkey","2 salmon fillets","1 lb sirloin (stir-fry option)","1 dozen eggs","Turkey bacon (1 pack)"] },
      { cat:"Produce", icon:"🥦", items:["2 sweet potatoes","1 bunch asparagus","2 heads broccoli","2 zucchini","3 bell peppers","1 bag baby spinach","1 bag romaine","Cherry tomatoes (1 pint)","2 avocados","1 lemon","3 bananas (freeze 1)","Frozen mixed berries","Fresh rosemary","Fresh parsley","Green beans","Baby potatoes"] },
      { cat:"Protein & Dairy", icon:"🥛", items:["Plain Greek yogurt (32 oz)","Feta or blue cheese crumbles","Shredded cheddar","Cottage cheese (16 oz)","Chocolate + vanilla protein powder","Milk or oat milk"] },
      { cat:"Pantry", icon:"🫙", items:["Whole grain bread (thick cut)","Whole wheat tortillas","Brown rice","Quinoa","Panko breadcrumbs","Jarred marinara","Low-sugar granola","Dijon mustard","Light mayo","Smoked paprika","Garlic powder","Italian seasoning","Ground flax","Almond butter","Chicken broth (32 oz)","Celery","Carrots","Onion","Olive oil","Tamari or soy sauce"] },
    ]},
    thu1:{ title:"Classic American — Week 1, Days 5–7", sections:[
      { cat:"Meat & Protein", icon:"🥩", items:["1 pork tenderloin","1 flank steak","1 rack of lamb (celebration option)","1 NY strip or ribeye (celebration option)","1 whole chicken (celebration option)","More chicken thighs (4)","Ground bison (1 lb, optional)"] },
      { cat:"Produce", icon:"🥦", items:["Baby fingerling potatoes","Fresh parsley (for chimichurri)","More avocados (2)","Frozen peaches or pineapple","Mixed fruit for brunch","Extra cherry tomatoes","More romaine","Mushrooms (for marsala option)"] },
      { cat:"Protein & Dairy", icon:"🥛", items:["Goat cheese or feta","More Greek yogurt if low","Mozzarella (for meatball sub option)"] },
      { cat:"Pantry", icon:"🫙", items:["Red wine vinegar","BBQ sauce (clean label)","Honey dijon","Whole grain hoagie rolls (optional)","More whole grain bread","Marsala wine (cooking)"] },
    ]},
    sun2:{ title:"Classic American — Week 2, Days 8–11", sections:[
      { cat:"Meat & Protein", icon:"🥩", items:["6 chicken thighs (bone-in)","2 chicken breasts","1 lb ground turkey","2 salmon fillets","Turkey bacon (1 pack)","1 dozen eggs","1 lb lean ground beef (taco option)"] },
      { cat:"Produce", icon:"🥦", items:["4 large bell peppers","1 bag baby spinach","Cherry tomatoes","2 cucumbers","2 avocados","Frozen corn","1 head red cabbage (coleslaw)","Brussels sprouts (1 lb)","3 bananas","Frozen mixed berries","Frozen mango","1 spaghetti squash (optional)","Broccoli (1 head)","Snap peas"] },
      { cat:"Protein & Dairy", icon:"🥛", items:["Plain Greek yogurt (32 oz)","Shredded cheddar","Feta or goat cheese","More protein powder if low","Oat milk"] },
      { cat:"Pantry", icon:"🫙", items:["White beans (2 cans)","Chickpeas (1 can)","Black beans (2 cans)","Brown rice","Quinoa","Rolled oats","Chia seeds","Peanut butter","Honey","Dijon mustard","Smoked paprika","Cumin","Chili powder","Chicken broth (32 oz)","Italian seasoning","Whole grain crackers","Kidney beans (for chili option)"] },
    ]},
    thu2:{ title:"Classic American — Week 2, Days 12–14", sections:[
      { cat:"Meat & Protein", icon:"🥩", items:["4 thick pork chops","Chicken wings (2 lbs)","1 whole chicken OR ribeye steak (celebration)","Filet mignon (2, surf & turf option)","1 lb shrimp (surf & turf option)","More turkey slices (deli)"] },
      { cat:"Produce", icon:"🥦", items:["Baby fingerling potatoes","Fresh thyme + rosemary","More avocados","Arugula (bag)","Apples (for slaw)","Red cabbage","More cherry tomatoes","Frozen dark cherries","Mushrooms (1 lb)","Cauliflower (1 head)"] },
      { cat:"Protein & Dairy", icon:"🥛", items:["Blue cheese or feta (for dip/wings)","Greek yogurt (creamed spinach)","More eggs","Parmesan (block)"] },
      { cat:"Pantry", icon:"🫙", items:["Hot sauce (your favorite)","Garlic parmesan sauce","Tahini","More olive oil","Flaky sea salt","More whole grain bread","White wine (cooking)"] },
    ]},
  },

  mediterranean: {
    sun1:{ title:"Mediterranean — Week 1, Days 1–4", sections:[
      { cat:"Fish, Meat & Protein", icon:"🐟", items:["2 sea bass fillets","1 lb shrimp (fresh or frozen)","Canned tuna in olive oil (2 cans)","2 chicken breasts or thighs","Ground lamb (1 lb)","1 dozen eggs"] },
      { cat:"Produce", icon:"🥦", items:["1 large eggplant","3 zucchini","2 red bell peppers","1 bag baby spinach","1 bag arugula","Cherry tomatoes (2 pints)","1 cucumber","Kalamata olives (jar)","Fresh parsley (2 bunches)","Fresh mint (1 bunch)","Fresh thyme + rosemary","2 lemons","3 limes","Dried or fresh figs","Frozen mango","Frozen strawberries","Walnuts","Green beans","1 fennel bulb"] },
      { cat:"Protein & Dairy", icon:"🥛", items:["Plain Greek yogurt (32 oz)","Feta cheese (block)","Labneh or thick Greek yogurt","Part-skim ricotta (8 oz)","Vanilla protein powder","1 dozen eggs"] },
      { cat:"Pantry", icon:"🫙", items:["Couscous","Farro","Bulgur wheat","Canned white beans (3 cans)","Canned chickpeas (2 cans)","Green or brown lentils (1 lb)","Whole wheat pita (pack)","Tahini","Olive oil (extra virgin)","Za'atar spice blend","Herbes de Provence","Cumin, coriander, turmeric, cinnamon","Roasted red peppers (jar)","Olive tapenade (jar)","Honey","Pistachios","Almond milk","Oat milk","Vegetable broth","Pine nuts","Saffron (small jar)"] },
    ]},
    thu1:{ title:"Mediterranean — Week 1, Days 5–7", sections:[
      { cat:"Fish, Meat & Protein", icon:"🐟", items:["2 salmon fillets","2 whole branzino","Ground lamb (1 lb, kofta)","Ahi tuna (2 steaks)","Octopus (optional — ask fishmonger)","Mussels (1 lb, paella option)"] },
      { cat:"Produce", icon:"🥦", items:["Extra fresh parsley","Baba ganoush (store-bought)","Stuffed grape leaves (jar or deli)","Frozen dark cherries","More bananas","Fresh dill","Fresh cilantro","Extra cucumber","Extra cherry tomatoes","Medjool dates (box)","Parsnips","Carrots (for root veg option)"] },
      { cat:"Protein & Dairy", icon:"🥛", items:["More Greek yogurt","Falafel (store-bought quality brand)"] },
      { cat:"Pantry", icon:"🫙", items:["Quinoa","Red wine vinegar","Dijon mustard","Capers (jar)","More za'atar","More olive oil","Sesame seeds","Hummus (store-bought)","Polenta (for braised option)","Red wine (cooking)"] },
    ]},
    sun2:{ title:"Mediterranean — Week 2, Days 8–11", sections:[
      { cat:"Fish, Meat & Protein", icon:"🐟", items:["3 salmon fillets","1 lb shrimp (fresh or frozen)","2 cod fillets","2 ahi tuna steaks","1 whole trout","2 chicken thighs","Ground chicken (1 lb, kofta option)"] },
      { cat:"Produce", icon:"🥦", items:["2 large eggplants","3 zucchini","2 bell peppers","Baby spinach (bag)","Arugula (bag)","Cherry tomatoes","2 cucumbers","Fresh parsley + mint","Lemons (3)","Frozen mango","Medjool dates (if not stocked)","Fresh figs (optional)","Carrots","Parsnips (for roasting)","Fresh dill"] },
      { cat:"Protein & Dairy", icon:"🥛", items:["Greek yogurt (32 oz)","Feta (block)","Labneh","Cottage cheese (16 oz)","1 dozen eggs","Vanilla protein powder"] },
      { cat:"Pantry", icon:"🫙", items:["Orzo pasta","Bulgur wheat","Farro","White beans (2 cans)","Chickpeas (2 cans)","Canned tomatoes (2 cans)","Veggie broth (32 oz)","Whole grain oats","Almond milk","Dried figs","Almond butter","Walnut butter or walnuts","Cardamom","More cumin + coriander","Chermoula paste (or make: cilantro + cumin + garlic + lemon)","Herbes de Provence","Preserved lemons (jar)","Kalamata olives (more)"] },
    ]},
    thu2:{ title:"Mediterranean — Week 2, Days 12–14", sections:[
      { cat:"Fish, Meat & Protein", icon:"🐟", items:["2 thick swordfish steaks","2 sea bass fillets","1 leg of lamb (celebration)","Lobster tails (celebration option)","1 lb shrimp (paella option)","4 chicken thighs"] },
      { cat:"Produce", icon:"🥦", items:["Baby potatoes","Root vegetables (carrots, parsnips)","Fresh rosemary + garlic","Tomatoes (for shakshuka)","More cherry tomatoes","Frozen dark cherries","Extra cucumbers","Fresh basil","Lemons (more)","1 fennel bulb","Asparagus"] },
      { cat:"Protein & Dairy", icon:"🥛", items:["More Greek yogurt","Feta (more)","Labneh (more if needed)","Eggs (1 dozen for shakshuka)"] },
      { cat:"Pantry", icon:"🫙", items:["Baba ganoush (more)","Stuffed grape leaves (more)","Hummus (large tub)","More whole grain pita","More tahini","Olive oil (extra bottle)","Flaky sea salt","More honey","Saffron (if making paella)","Short-grain rice (paella)","Red wine (cooking)"] },
    ]},
  },
};

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function Pill({ type }) {
  const t = TAG_MAP[type] || TAG_MAP.protein;
  return (
    <span style={{ background:t.bg, color:t.tx, fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:20, whiteSpace:"nowrap" }}>
      {t.label}
    </span>
  );
}

function StarButton({ mealId, favorites, onToggle, theme }) {
  const starred = favorites.includes(mealId);
  return (
    <button
      onClick={e => { e.stopPropagation(); onToggle(mealId); }}
      title={starred ? "Remove from favorites" : "Add to favorites"}
      style={{
        background: starred ? theme.accent : "transparent",
        border:`2px solid ${starred ? theme.accent : theme.border}`,
        borderRadius:8, cursor:"pointer", padding:"4px 8px",
        fontSize:14, lineHeight:1, transition:"all 0.15s", flexShrink:0,
      }}
    >{starred ? "⭐" : "☆"}</button>
  );
}

function MealRow({ icon, label, mealId, meal, favorites, onToggle, theme }) {
  return (
    <div style={{ marginBottom:14 }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:3 }}>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <span style={{ fontSize:14 }}>{icon}</span>
          <span style={{ fontSize:11, fontWeight:700, color:"#536065", textTransform:"uppercase", letterSpacing:"0.07em" }}>{label}</span>
          {meal.prep && <span style={{ fontSize:11, color:theme.mid, fontWeight:600 }}>· {meal.prep}</span>}
        </div>
        <StarButton mealId={mealId} favorites={favorites} onToggle={onToggle} theme={theme} />
      </div>
      <div style={{ fontWeight:800, fontSize:15, color:"#1A1F1E", marginBottom:4 }}>
        {meal.meal}
        <span style={{ fontWeight:500, fontSize:13, color:theme.mid, marginLeft:6 }}>({meal.cal} cal)</span>
      </div>
      <div style={{ fontSize:13, color:"#536065", lineHeight:1.55, marginBottom:6 }}>{meal.desc}</div>
      <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
        {meal.tags.map(t => <Pill key={t} type={t} />)}
      </div>
    </div>
  );
}

function DinnerSelector({ dayId, dinners, selectedDinners, onSelect, favorites, onToggle, theme }) {
  const selected = selectedDinners[dayId] ?? 0;
  const dinner = dinners[selected];
  const mealId = `${dayId}-dinner-${selected}`;

  const shuffle = () => {
    let next;
    do { next = Math.floor(Math.random() * dinners.length); } while (next === selected && dinners.length > 1);
    onSelect(dayId, next);
  };

  return (
    <div>
      {/* Dinner header row */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <span style={{ fontSize:14 }}>🍳</span>
          <span style={{ fontSize:11, fontWeight:700, color:"#536065", textTransform:"uppercase", letterSpacing:"0.07em" }}>Dinner</span>
          <span style={{ fontSize:11, color:theme.mid, fontWeight:600 }}>· {dinner.prep}</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          {/* Toggle arrows */}
          <div style={{ display:"flex", alignItems:"center", gap:2, background:theme.light, borderRadius:20, padding:"3px 6px" }}>
            <button
              onClick={() => onSelect(dayId, (selected - 1 + dinners.length) % dinners.length)}
              style={{ background:"none", border:"none", cursor:"pointer", color:theme.primary, fontWeight:900, fontSize:16, padding:"0 4px", lineHeight:1 }}
              title="Previous dinner option"
            >‹</button>
            <span style={{ fontSize:11, fontWeight:700, color:theme.primary, minWidth:30, textAlign:"center" }}>
              {selected + 1}/{dinners.length}
            </span>
            <button
              onClick={() => onSelect(dayId, (selected + 1) % dinners.length)}
              style={{ background:"none", border:"none", cursor:"pointer", color:theme.primary, fontWeight:900, fontSize:16, padding:"0 4px", lineHeight:1 }}
              title="Next dinner option"
            >›</button>
          </div>
          {/* Shuffle button */}
          <button
            onClick={shuffle}
            title="Shuffle to a random dinner"
            style={{ background:theme.accent, border:"none", borderRadius:20, cursor:"pointer", padding:"4px 10px", fontSize:12, fontWeight:700, color:"#fff", transition:"all 0.15s" }}
          >🔀 Shuffle</button>
          {/* Star */}
          <StarButton mealId={mealId} favorites={favorites} onToggle={onToggle} theme={theme} />
        </div>
      </div>

      {/* Dinner option dots */}
      <div style={{ display:"flex", gap:5, marginBottom:8 }}>
        {dinners.map((_, i) => (
          <button
            key={i}
            onClick={() => onSelect(dayId, i)}
            style={{
              width:8, height:8, borderRadius:"50%", border:"none", cursor:"pointer", padding:0,
              background: i === selected ? theme.primary : theme.border,
              transition:"background 0.2s",
            }}
            title={`Option ${i + 1}`}
          />
        ))}
      </div>

      {/* Meal details */}
      <div style={{ fontWeight:800, fontSize:15, color:"#1A1F1E", marginBottom:4 }}>
        {dinner.meal}
        <span style={{ fontWeight:500, fontSize:13, color:theme.mid, marginLeft:6 }}>({dinner.cal} cal)</span>
      </div>
      <div style={{ fontSize:13, color:"#536065", lineHeight:1.55, marginBottom:6 }}>{dinner.desc}</div>
      <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
        {dinner.tags.map(t => <Pill key={t} type={t} />)}
      </div>
    </div>
  );
}

function DayCard({ d, planId, favorites, onToggle, theme, selectedDinners, onSelectDinner }) {
  const [open, setOpen] = useState(false);
  const idx = parseInt(d.date.replace("Day ","")) - 1;
  const hue = theme.dayHues[idx % theme.dayHues.length];
  const dayId = `${planId}-${d.date}`;
  const makeId = slot => `${dayId}-${slot}`;
  const anyStarred = [makeId("morning-0"), makeId("lunch-0"), ...d.dinners.map((_,i) => `${dayId}-dinner-${i}`)].some(id => favorites.includes(id))
    || favorites.includes(makeId("morning")) || favorites.includes(makeId("lunch"));

  return (
    <div style={{ background:"#FFFFFF", border:`1px solid ${theme.border}`, borderRadius:14, overflow:"hidden", marginBottom:10, boxShadow:"0 1px 3px rgba(0,0,0,0.05)" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width:"100%", padding:"14px 16px", background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", gap:10 }}
      >
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:44, height:44, borderRadius:12, background:hue, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <span style={{ color:"rgba(255,255,255,0.7)", fontSize:9, fontWeight:700 }}>{d.date}</span>
            <span style={{ color:"#fff", fontSize:13, fontWeight:900 }}>{d.day.slice(0,3).toUpperCase()}</span>
          </div>
          <div style={{ textAlign:"left" }}>
            <div style={{ fontWeight:800, fontSize:16, color:"#1A1F1E", display:"flex", alignItems:"center", gap:6 }}>
              {d.day}
              {anyStarred && <span title="Has favorites" style={{ fontSize:12 }}>⭐</span>}
            </div>
            <div style={{ fontSize:12, color:"#536065", fontStyle:"italic" }}>{d.theme}</div>
          </div>
        </div>
        <span style={{ color:"#536065", fontSize:16, transform:open?"rotate(180deg)":"none", transition:"transform 0.2s" }}>▾</span>
      </button>

      {open && (
        <div style={{ padding:"0 16px 16px", borderTop:`1px solid ${theme.border}` }}>
          <div style={{ paddingTop:14 }}>
            <MealRow icon="🥤" label="Morning" mealId={makeId("morning")} meal={d.morning} favorites={favorites} onToggle={onToggle} theme={theme} />
            <div style={{ height:1, background:theme.border, margin:"10px 0" }} />
            <MealRow icon="🥗" label="Lunch" mealId={makeId("lunch")} meal={d.lunch} favorites={favorites} onToggle={onToggle} theme={theme} />
            <div style={{ height:1, background:theme.border, margin:"10px 0" }} />
            <DinnerSelector dayId={dayId} dinners={d.dinners} selectedDinners={selectedDinners} onSelect={onSelectDinner} favorites={favorites} onToggle={onToggle} theme={theme} />
            {d.notes && (
              <div style={{ marginTop:12, padding:"10px 13px", background:theme.accentLight, borderRadius:9, borderLeft:`3px solid ${theme.accent}`, fontSize:12, color:theme.accent, fontWeight:600, lineHeight:1.5 }}>
                💡 {d.notes}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function GroceryList({ data, theme }) {
  const [checked, setChecked] = useState({});
  const toggle = k => setChecked(p => ({ ...p, [k]: !p[k] }));
  const total = data.sections.reduce((a,s) => a + s.items.length, 0);
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
        <div style={{ flex:1, height:7, background:theme.border, borderRadius:99, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${(done/total)*100}%`, background:theme.accent, borderRadius:99, transition:"width 0.3s" }} />
        </div>
        <span style={{ fontSize:12, color:"#536065", fontWeight:600, flexShrink:0 }}>{done}/{total}</span>
        <button onClick={() => setChecked({})} style={{ fontSize:11, color:"#536065", background:"none", border:`1px solid ${theme.border}`, borderRadius:6, padding:"3px 8px", cursor:"pointer" }}>Reset</button>
      </div>
      {data.sections.map(sec => (
        <div key={sec.cat} style={{ marginBottom:18 }}>
          <div style={{ fontWeight:800, fontSize:13, color:"#1A1F1E", marginBottom:8, display:"flex", alignItems:"center", gap:6 }}>
            <span>{sec.icon}</span> {sec.cat}
          </div>
          {sec.items.map((item,i) => {
            const k = `${sec.cat}-${i}`;
            return (
              <div key={k} onClick={() => toggle(k)} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 10px", borderRadius:8, cursor:"pointer", marginBottom:2, transition:"background 0.15s", background:checked[k] ? theme.seafoam : "#F7F5F0", opacity:checked[k]?0.55:1 }}>
                <div style={{ width:18, height:18, borderRadius:5, flexShrink:0, border:`2px solid ${checked[k] ? theme.accent : theme.border}`, background:checked[k] ? theme.accent : "transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  {checked[k] && <span style={{ color:"#fff", fontSize:11, fontWeight:900 }}>✓</span>}
                </div>
                <span style={{ fontSize:14, color:"#1A1F1E", textDecoration:checked[k]?"line-through":"none" }}>{item}</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function FavoritesTab({ favorites, planId, allDays, theme, selectedDinners }) {
  const starredMeals = [];
  allDays.forEach(d => {
    const dayId = `${planId}-${d.date}`;
    ["morning","lunch"].forEach(slot => {
      const id = `${dayId}-${slot}`;
      if (favorites.includes(id)) {
        const icons = { morning:"🥤", lunch:"🥗" };
        const labels = { morning:"Morning", lunch:"Lunch" };
        starredMeals.push({ id, day:d.day, date:d.date, slot, icon:icons[slot], label:labels[slot], meal:d[slot] });
      }
    });
    d.dinners.forEach((dinner, i) => {
      const id = `${dayId}-dinner-${i}`;
      if (favorites.includes(id)) {
        starredMeals.push({ id, day:d.day, date:d.date, slot:`dinner-${i}`, icon:"🍳", label:`Dinner Option ${i+1}`, meal:dinner });
      }
    });
  });

  if (starredMeals.length === 0) {
    return (
      <div style={{ textAlign:"center", padding:"50px 20px", color:"#536065" }}>
        <div style={{ fontSize:48, marginBottom:12 }}>☆</div>
        <div style={{ fontWeight:800, fontSize:16, color:"#1A1F1E", marginBottom:6 }}>No favorites yet</div>
        <div style={{ fontSize:13, lineHeight:1.6 }}>Tap the ☆ star icon on any meal to save it here. Starred meals will remind you to add them to your next 2-week plan.</div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ background:theme.accentLight, border:`1px solid ${theme.accent}22`, borderRadius:12, padding:"12px 16px", marginBottom:16 }}>
        <div style={{ fontWeight:800, fontSize:13, color:theme.accent, marginBottom:3 }}>⭐ {starredMeals.length} Favorite{starredMeals.length !== 1 ? "s" : ""} Saved</div>
        <div style={{ fontSize:12, color:"#536065", lineHeight:1.5 }}>These meals will remind you to include them when you build your next 2-week plan. Ask Claude: "Build my next 2 weeks using my favorites."</div>
      </div>
      {starredMeals.map(item => (
        <div key={item.id} style={{ background:"#FFFFFF", border:`1px solid ${theme.border}`, borderRadius:12, padding:"14px 16px", marginBottom:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
            <span style={{ fontSize:14 }}>{item.icon}</span>
            <span style={{ fontSize:11, fontWeight:700, color:"#536065", textTransform:"uppercase", letterSpacing:"0.07em" }}>{item.label}</span>
            <span style={{ fontSize:11, color:theme.mid, fontWeight:600 }}>· {item.day}</span>
            <span style={{ marginLeft:"auto", fontSize:16 }}>⭐</span>
          </div>
          <div style={{ fontWeight:800, fontSize:15, color:"#1A1F1E", marginBottom:4 }}>
            {item.meal.meal}
            <span style={{ fontWeight:500, fontSize:13, color:theme.mid, marginLeft:6 }}>({item.meal.cal} cal)</span>
          </div>
          <div style={{ fontSize:13, color:"#536065", lineHeight:1.5 }}>{item.meal.desc}</div>
          <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginTop:6 }}>
            {item.meal.tags.map(t => <Pill key={t} type={t} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
const PLAN_DATA = {
  pescatarian:   { week1:PESC_WEEK1,  week2:PESC_WEEK2  },
  classic:       { week1:CLASS_WEEK1, week2:CLASS_WEEK2  },
  mediterranean: { week1:MED_WEEK1,   week2:MED_WEEK2   },
};

export default function App() {
  const [plan, setPlan]   = useState("pescatarian");
  const [view, setView]   = useState("plan");
  const [week, setWeek]   = useState(1);
  const [gList, setGList] = useState("sun1");

  const [favorites, setFavs] = useState(() => {
    try { return JSON.parse(localStorage.getItem("mealplan-favs") || "[]"); } catch { return []; }
  });
  const [selectedDinners, setSelectedDinners] = useState(() => {
    try { return JSON.parse(localStorage.getItem("mealplan-dinners") || "{}"); } catch { return {}; }
  });

  const theme    = THEMES[plan];
  const data     = PLAN_DATA[plan];
  const days     = week === 1 ? data.week1 : data.week2;
  const allDays  = [...data.week1, ...data.week2];
  const groceries = GROCERIES[plan];

  const toggleFav = id => {
    setFavs(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      try { localStorage.setItem("mealplan-favs", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const selectDinner = (dayId, idx) => {
    setSelectedDinners(prev => {
      const next = { ...prev, [dayId]: idx };
      try { localStorage.setItem("mealplan-dinners", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const planFavCount = allDays.reduce((count, d) => {
    const dayId = `${plan}-${d.date}`;
    const morning = favorites.includes(`${dayId}-morning`) ? 1 : 0;
    const lunch   = favorites.includes(`${dayId}-lunch`) ? 1 : 0;
    const dinnerStars = d.dinners.filter((_,i) => favorites.includes(`${dayId}-dinner-${i}`)).length;
    return count + morning + lunch + dinnerStars;
  }, 0);

  const NAV = [
    { id:"plan",      label:"📋 Plan" },
    { id:"groceries", label:"🛒 Groceries" },
    { id:"favorites", label:`⭐ Faves${planFavCount > 0 ? ` (${planFavCount})` : ""}` },
  ];

  return (
    <div style={{ fontFamily:"'Inter', system-ui, sans-serif", background:"#F7F5F0", minHeight:"100vh" }}>
      {/* ── Header ── */}
      <div style={{ background:theme.primary }}>
        <div style={{ maxWidth:640, margin:"0 auto" }}>

          {/* Plan tabs */}
          <div style={{ display:"flex", borderBottom:`1px solid rgba(255,255,255,0.15)` }}>
            {Object.values(THEMES).map(t => (
              <button
                key={t.id}
                onClick={() => { setPlan(t.id); setView("plan"); setWeek(1); setGList("sun1"); }}
                style={{
                  flex:1, padding:"14px 8px", background:"none", border:"none", cursor:"pointer",
                  fontSize:13, fontWeight:700,
                  color: plan === t.id ? "#fff" : "rgba(255,255,255,0.45)",
                  borderBottom:`3px solid ${plan === t.id ? "#fff" : "transparent"}`,
                  transition:"all 0.15s", whiteSpace:"nowrap",
                  letterSpacing:"0.01em",
                }}
              >{t.label}</button>
            ))}
          </div>

          {/* Title & subtitle */}
          <div style={{ padding:"14px 20px 0" }}>
            <h1 style={{ color:"#fff", fontSize:20, fontWeight:900, margin:0, lineHeight:1.2 }}>
              {theme.label} Plan
            </h1>
            <p style={{ color:"rgba(255,255,255,0.6)", fontSize:12, margin:"4px 0 14px", lineHeight:1.5 }}>
              {theme.tagNote} · 2 weeks · Tap any day to expand
            </p>

            {/* Nav tabs */}
            <div style={{ display:"flex" }}>
              {NAV.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setView(tab.id)}
                  style={{
                    flex:1, padding:"10px 4px", background:"none", border:"none", cursor:"pointer",
                    fontSize:12, fontWeight:700,
                    color: view === tab.id ? "#fff" : "rgba(255,255,255,0.45)",
                    borderBottom:`3px solid ${view === tab.id ? theme.accent : "transparent"}`,
                    transition:"all 0.15s", whiteSpace:"nowrap",
                  }}
                >{tab.label}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ maxWidth:640, margin:"0 auto", padding:"16px 16px 60px" }}>

        {view === "plan" && (
          <>
            <div style={{ display:"flex", gap:8, marginBottom:14 }}>
              {[1,2].map(w => (
                <button key={w} onClick={() => setWeek(w)} style={{ flex:1, padding:11, borderRadius:10, cursor:"pointer", border:`2px solid ${week===w ? theme.primary : theme.border}`, background:week===w ? theme.light : "#fff", color:week===w ? theme.primary : "#536065", fontWeight:800, fontSize:14, transition:"all 0.15s" }}>Week {w}</button>
              ))}
            </div>

            {days.map(d => (
              <DayCard key={d.date} d={d} planId={plan} favorites={favorites} onToggle={toggleFav} theme={theme} selectedDinners={selectedDinners} onSelectDinner={selectDinner} />
            ))}
          </>
        )}

        {view === "groceries" && (
          <>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
              {[
                { id:"sun1", label:"Week 1 Sunday", sub:"Days 1–4" },
                { id:"thu1", label:"Week 1 Thursday", sub:"Days 5–7" },
                { id:"sun2", label:"Week 2 Sunday", sub:"Days 8–11" },
                { id:"thu2", label:"Week 2 Thursday", sub:"Days 12–14" },
              ].map(g => (
                <button key={g.id} onClick={() => setGList(g.id)} style={{ padding:"10px 12px", borderRadius:10, cursor:"pointer", border:`2px solid ${gList===g.id ? theme.primary : theme.border}`, background:gList===g.id ? theme.light : "#fff", textAlign:"left", transition:"all 0.15s" }}>
                  <div style={{ fontWeight:800, fontSize:13, color:gList===g.id ? theme.primary : "#1A1F1E" }}>{g.label}</div>
                  <div style={{ fontSize:11, color:"#536065" }}>{g.sub}</div>
                </button>
              ))}
            </div>
            <div style={{ background:"#fff", borderRadius:14, padding:18, border:`1px solid ${theme.border}`, boxShadow:"0 1px 4px rgba(0,0,0,0.05)" }}>
              <h2 style={{ margin:"0 0 16px", fontSize:16, fontWeight:900, color:"#1A1F1E" }}>{groceries[gList].title}</h2>
              <GroceryList data={groceries[gList]} theme={theme} />
            </div>
          </>
        )}

        {view === "favorites" && (
          <FavoritesTab favorites={favorites} planId={plan} allDays={allDays} theme={theme} selectedDinners={selectedDinners} />
        )}
      </div>
    </div>
  );
}
