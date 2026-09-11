import { useState } from "react";

const THEMES = {
  classic:       { id:"classic",       label:"American",      primary:"#2E6B3E", mid:"#3D8B52", light:"#E8F5EC", seafoam:"#D4EDD9", accent:"#E07A3A", accentLight:"#FDF0E8", border:"#D8E8DC", tagNote:"High Protein American",    dayHues:["#2E6B3E","#347844","#3A864B","#3D8B52","#3F9158","#32753F","#2C6A3B","#3B8A4F","#368048","#3D8D53","#307240","#3C8A50","#2A6338","#3F9259"] },
  pescatarian:   { id:"pescatarian",   label:"Pescatarian",   primary:"#1B5E7B", mid:"#2C8FAD", light:"#E3F4FA", seafoam:"#D6EFE8", accent:"#3DAA7A", accentLight:"#E3F6EE", border:"#DCE8EC", tagNote:"Veg & Fish only",          dayHues:["#1B5E7B","#1E6F8F","#2280A3","#2C8FAD","#2A7F9A","#236E87","#1D6278","#195571","#22768E","#267FA0","#1F6A84","#2B8CAE","#1A5C75","#248898"] },
  mediterranean: { id:"mediterranean", label:"Mediterranean", primary:"#4A2D7A", mid:"#6B46AA", light:"#F0EAF8", seafoam:"#E2D4F5", accent:"#B5479A", accentLight:"#FAE8F5", border:"#DDD0EE", tagNote:"Low Fat · High Protein",   dayHues:["#4A2D7A","#573595","#623DA0","#6B46AA","#7450B2","#5C3A9B","#4F3088","#6A44A8","#5E3D9E","#7254B5","#543292","#6840A5","#4C2E80","#6E48AC"] },
  budget:        { id:"budget",        label:"Budget",        primary:"#B85C00", mid:"#D97706", light:"#FFF4E6", seafoam:"#FFE4C4", accent:"#E07A3A", accentLight:"#FDF0E8", border:"#F5D9B8", tagNote:"$100-$125 for 2 Weeks",     dayHues:["#B85C00","#C46500","#D07000","#D97706","#C96800","#B35800","#CC6C00","#D47500","#BF6200","#D07200","#C06300","#D57800","#BA5F00","#DC7A00"] },
};

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

// ─── AMERICAN PLAN DATA ────────────────────────────────────────────────────────
const CLASS_WEEK1 = [
  { day:"Sunday",    date:"Day 1",  theme:"Strong Start",
    breakfasts:[
      { meal:"Veggie Egg Scramble + Toast",         cal:390, desc:"3 eggs scrambled with baby spinach, cherry tomatoes, feta. Whole grain toast with avocado.", prep:"10 min", tags:["protein"] },
      { meal:"Greek Yogurt Parfait",                 cal:340, desc:"Plain Greek yogurt + frozen berries + chia seeds + granola + honey drizzle.", prep:"3 min",  tags:["protein","fiber","easy"] },
      { meal:"Banana Protein Shake",                 cal:350, desc:"Blend: 1 frozen banana, 1 scoop vanilla protein, 1 tbsp PB, 1 cup oat milk. ~30g protein.", prep:"3 min",  tags:["protein","shake"] },
    ],
    lunches:[
      { meal:"Grilled Chicken Caesar Salad",         cal:420, desc:"Romaine, grilled chicken breast, shaved parmesan, whole grain croutons, light Caesar dressing.", prep:"10 min", tags:["protein","meat"] },
      { meal:"Turkey & Avocado Wrap",                cal:410, desc:"Whole wheat tortilla, deli turkey, avocado, arugula, mustard, sliced tomato.", prep:"4 min",  tags:["protein","meat","easy"] },
      { meal:"Chicken & White Bean Soup",            cal:370, desc:"Batch-cook: diced chicken, white beans, chicken broth, celery, carrots, garlic, thyme.", prep:"25 min", tags:["protein","fiber","meat"] },
    ],
    dinners:[
      { meal:"Baked Lemon Herb Chicken + Sweet Potato Mash + Broccoli", cal:560, desc:"Chicken thighs with lemon, garlic, rosemary at 400F for 35 min. Sweet potato mash and roasted broccoli.", prep:"40 min", tags:["protein","fiber","meat"] },
      { meal:"Air Fryer Pork Tenderloin + Green Beans + Dijon Sauce",   cal:520, desc:"Pork tenderloin with garlic and smoked paprika, air fried at 400F for 20 min. Simple dijon pan sauce. Green beans.", prep:"30 min", tags:["protein","meat"] },
      { meal:"Sheet Pan Steak + Bell Peppers + Baby Potatoes",          cal:590, desc:"Flank steak with garlic and herbs. Bell peppers and baby potatoes roasted at 425F. Chimichurri on the side.", prep:"35 min", tags:["protein","fiber","meat"] },
      { meal:"Turkey Meatballs + Zucchini Noodles + Marinara",          cal:480, desc:"Lean turkey meatballs baked at 400F. Spiralized zucchini noodles. Quality jarred marinara.", prep:"35 min", tags:["protein","fiber","meat"] },
      { meal:"Stuffed Bell Peppers + Ground Turkey + Brown Rice",        cal:530, desc:"Peppers filled with ground turkey, brown rice, diced tomatoes, cumin, cheddar on top. Bake at 375F for 30 min.", prep:"40 min", tags:["protein","fiber","meat"] },
    ],
    notes:"Cook extra chicken tonight for tomorrow's lunch.",
  },
  { day:"Monday",    date:"Day 2",  theme:"Power Week",
    breakfasts:[
      { meal:"Avocado Toast + Fried Eggs",           cal:410, desc:"Thick whole-grain toast, smashed avocado with red pepper flakes, 2 fried eggs on top.", prep:"8 min",  tags:["protein","fiber"] },
      { meal:"PB Banana Protein Shake",              cal:370, desc:"Blend: 1 frozen banana, 2 tbsp PB, 1 scoop chocolate protein, 1 tbsp flax, 1 cup oat milk.", prep:"3 min",  tags:["protein","fiber","shake"] },
      { meal:"Cottage Cheese Bowl + Fruit",          cal:290, desc:"1 cup cottage cheese + sliced peaches or pineapple + hemp seeds + cinnamon.", prep:"2 min",  tags:["protein","easy"] },
    ],
    lunches:[
      { meal:"Leftover Chicken & Avocado Wrap",      cal:430, desc:"Sunday's chicken in a whole wheat tortilla with avocado, arugula, mustard, sliced tomato.", prep:"4 min",  tags:["protein","meat","easy"] },
      { meal:"Big Cobb Salad",                       cal:450, desc:"Romaine, grilled chicken, hard-boiled egg, avocado, cherry tomatoes, turkey bacon, feta. Olive oil and red wine vinegar.", prep:"10 min", tags:["protein","meat"] },
      { meal:"Chicken Soup (Leftover)",              cal:360, desc:"Sunday's soup in a thermos. Grab whole grain bread for dipping.", prep:"0 min",  tags:["protein","fiber","easy"] },
    ],
    dinners:[
      { meal:"Baked BBQ Chicken Breast + Roasted Corn + Coleslaw",      cal:510, desc:"Chicken breast with clean BBQ sauce, baked at 400F for 25 min. Roasted corn. Light Greek yogurt coleslaw.", prep:"30 min", tags:["protein","meat"] },
      { meal:"Chicken Fajita Bowl + Brown Rice + Avocado",              cal:550, desc:"Chicken strips with sauteed peppers and onions, cumin, chili powder. Over brown rice with avocado and salsa.", prep:"25 min", tags:["protein","fiber","meat"] },
      { meal:"Honey Garlic Salmon + Roasted Sweet Potatoes + Broccolini",cal:530, desc:"Salmon glazed with honey, garlic, tamari. Sweet potato wedges and broccolini at 425F.", prep:"30 min", tags:["protein","fiber","fish"] },
      { meal:"Lean Beef Stir-Fry + Snap Peas + Brown Rice",             cal:520, desc:"Thinly sliced sirloin with snap peas, bell pepper, garlic, ginger in tamari-honey sauce. Brown rice base.", prep:"20 min", tags:["protein","fiber","meat"] },
      { meal:"Air Fryer Chicken Tenders + Sweet Potato Fries",          cal:510, desc:"Chicken tenders in panko and parmesan, air fried at 400F for 12 min. Sweet potato fries alongside.", prep:"25 min", tags:["protein","meat"] },
    ],
    notes:"Make overnight oats tonight for Tuesday morning.",
  },
  { day:"Tuesday",   date:"Day 3",  theme:"Midweek Momentum",
    breakfasts:[
      { meal:"Overnight Oats with Berries",          cal:340, desc:"Made last night: oats + milk + chia + PB + berries on top. Grab from fridge.", prep:"0 min",  tags:["fiber","easy"] },
      { meal:"Hard-Boiled Eggs + Apple + Almond Butter", cal:300, desc:"2 eggs + 1 apple with almond butter for dipping. 30-second breakfast.", prep:"0 min",  tags:["protein","easy"] },
      { meal:"Green Protein Smoothie",               cal:320, desc:"Blend: 1 cup frozen spinach, 1 frozen banana, 1 scoop vanilla protein, 1 tbsp almond butter, 1 cup almond milk.", prep:"3 min",  tags:["protein","fiber","shake"] },
    ],
    lunches:[
      { meal:"Turkey & Veggie Soup",                 cal:360, desc:"Ground turkey, carrots, celery, onion, chicken broth, Italian seasoning. Pack in thermos.", prep:"5 min",  tags:["protein","fiber","meat"] },
      { meal:"Grilled Chicken & Avocado BLT",        cal:440, desc:"Whole grain bread, grilled chicken, avocado, turkey bacon, romaine, tomato, dijon.", prep:"7 min",  tags:["protein","meat"] },
      { meal:"Protein Mason Jar Salad",              cal:390, desc:"Chickpeas, cucumber, cherry tomatoes, feta, romaine, lemon-tahini dressing. Shake and eat.", prep:"5 min",  tags:["protein","fiber"] },
    ],
    dinners:[
      { meal:"Air Fryer Salmon Bites + Roasted Asparagus + Brown Rice", cal:510, desc:"Salmon cubed, tossed in olive oil, garlic, smoked paprika. Air fry at 400F for 8 min. Asparagus roasted alongside.", prep:"20 min", tags:["protein","fiber","fish"] },
      { meal:"Ground Turkey Lettuce Tacos + Mango Salsa",               cal:420, desc:"Lean ground turkey in taco seasoning, served in romaine cups. Fresh mango salsa, shredded cabbage, lime crema.", prep:"20 min", tags:["protein","meat"] },
      { meal:"Baked Chicken Breast + Garlic Green Beans + Quinoa",      cal:490, desc:"Chicken marinated in olive oil, lemon, garlic, dijon. Baked at 400F for 25 min. Green beans and fluffy quinoa.", prep:"30 min", tags:["protein","fiber","meat"] },
      { meal:"Chicken Marsala + Roasted Fingerlings + Wilted Spinach",  cal:540, desc:"Chicken breast in marsala wine and mushroom sauce. Crispy fingerling potatoes. Wilted spinach with garlic.", prep:"30 min", tags:["protein","meat"] },
      { meal:"Salmon Tacos + Cabbage Slaw + Chipotle Crema",           cal:520, desc:"Blackened salmon in corn tortillas with shredded cabbage, chipotle Greek yogurt crema, avocado, fresh lime.", prep:"25 min", tags:["protein","fish"] },
    ],
    notes:"Cook extra brown rice — saves you Wednesday.",
  },
  { day:"Wednesday", date:"Day 4",  theme:"Halfway",
    breakfasts:[
      { meal:"Protein Pancakes",                     cal:380, desc:"Mix: 1 scoop protein powder, 1 mashed banana, 2 eggs. Cook like pancakes. Top with Greek yogurt and berries.", prep:"10 min", tags:["protein"] },
      { meal:"Greek Yogurt Bowl with Granola & Banana", cal:320, desc:"Plain Greek yogurt, sliced banana, low-sugar granola, drizzle of honey.", prep:"2 min",  tags:["protein","easy"] },
      { meal:"Triple Berry Protein Shake",           cal:350, desc:"Blend: 1 cup frozen mixed berries, 1 scoop protein, 1 cup Greek yogurt, 1 tbsp chia seeds, half cup milk.", prep:"3 min",  tags:["protein","fiber","shake"] },
    ],
    lunches:[
      { meal:"Turkey Soup (Leftover)",               cal:350, desc:"Tuesday's soup in a thermos. Whole grain bread for dipping.", prep:"0 min",  tags:["protein","fiber","easy"] },
      { meal:"Tuna Salad on Whole Grain Crackers",   cal:320, desc:"Canned tuna with mayo, dijon, celery, lemon. On whole grain crackers with carrot sticks.", prep:"4 min",  tags:["protein","fish","easy"] },
      { meal:"Turkey & Avocado Club",                cal:450, desc:"Whole grain bread, sliced turkey, avocado, romaine, tomato, turkey bacon, dijon.", prep:"5 min",  tags:["protein","meat"] },
    ],
    dinners:[
      { meal:"Baked Chicken Breast + Garlic Green Beans + Quinoa",      cal:490, desc:"Chicken marinated in olive oil, lemon, garlic, dijon. Baked at 400F for 25 min. Green beans and quinoa.", prep:"30 min", tags:["protein","fiber","meat"] },
      { meal:"Honey Garlic Salmon + Roasted Sweet Potatoes + Broccolini",cal:530, desc:"Salmon with honey, garlic, tamari glaze. Sweet potato wedges and broccolini on same sheet pan.", prep:"30 min", tags:["protein","fiber","fish"] },
      { meal:"Turkey Meatloaf Muffins + Mashed Cauliflower + Green Beans",cal:490, desc:"Turkey meatloaf cups baked in muffin tin. Silky mashed cauliflower with garlic and parmesan. Green beans.", prep:"35 min", tags:["protein","fiber","meat"] },
      { meal:"Baked Salmon + Quinoa + Roasted Brussels Sprouts",        cal:530, desc:"Salmon with dijon, honey, lemon. Brussels sprouts halved, roasted at 425F until crispy. Fluffy quinoa.", prep:"30 min", tags:["protein","fiber","fish"] },
      { meal:"Ground Turkey & Zucchini Boats + Parmesan Crust",         cal:460, desc:"Zucchini halves filled with seasoned ground turkey, diced tomatoes, mozzarella. Baked at 400F until bubbly.", prep:"30 min", tags:["protein","fiber","meat"] },
    ],
    notes:"Thursday grocery run tonight.",
  },
  { day:"Thursday",  date:"Day 5",  theme:"Second Wind",
    breakfasts:[
      { meal:"Full Breakfast Spread",                cal:480, desc:"2 eggs any style, 2 strips turkey bacon, avocado toast on thick whole grain bread, side of mixed fruit.", prep:"15 min", tags:["protein","fiber"] },
      { meal:"Blueberry Flax Smoothie",              cal:300, desc:"Blend: 1 cup frozen blueberries, 1 cup Greek yogurt, 1 tbsp ground flax, 1 tsp honey, half cup almond milk.", prep:"3 min",  tags:["protein","fiber","shake"] },
      { meal:"Cottage Cheese Bowl + Fruit",          cal:290, desc:"1 cup cottage cheese + sliced peaches or pineapple + hemp seeds and cinnamon.", prep:"2 min",  tags:["protein","easy"] },
    ],
    lunches:[
      { meal:"Grilled Chicken & Avocado BLT",        cal:440, desc:"Whole grain bread, grilled chicken, avocado, turkey bacon, romaine, tomato, dijon.", prep:"7 min",  tags:["protein","meat"] },
      { meal:"Big Protein Power Salad",              cal:470, desc:"Mixed greens + hard-boiled eggs + grilled chicken + avocado + quinoa + roasted chickpeas + tahini lemon dressing.", prep:"10 min", tags:["protein","fiber","meat"] },
      { meal:"Pork & Veggie Wrap",                   cal:400, desc:"Leftover pork (or deli turkey) in a whole wheat tortilla with arugula, roasted red peppers, dijon.", prep:"3 min",  tags:["protein","meat","easy"] },
    ],
    dinners:[
      { meal:"Air Fryer Pork Tenderloin + Sweet Potato + Sauteed Spinach",cal:520, desc:"Pork with garlic, smoked paprika, cumin. Air fry at 400F for 20 min. Sweet potato wedges and garlicky spinach.", prep:"30 min", tags:["protein","fiber","meat"] },
      { meal:"Turkey Meatloaf Muffins + Mashed Cauliflower + Green Beans",cal:490, desc:"Turkey meatloaf cups in muffin tin. Mashed cauliflower with garlic and parmesan. Steamed green beans.", prep:"35 min", tags:["protein","fiber","meat"] },
      { meal:"Chicken Marsala + Roasted Fingerlings + Wilted Spinach",  cal:540, desc:"Chicken breast in marsala wine and mushroom sauce. Crispy fingerling potatoes. Wilted spinach.", prep:"30 min", tags:["protein","meat"] },
      { meal:"Baked Salmon + Roasted Asparagus + Farro",                cal:530, desc:"Salmon with dijon honey glaze. Asparagus roasted with lemon. Nutty farro base.", prep:"30 min", tags:["protein","fiber","fish"] },
      { meal:"Sirloin Steak + Roasted Mushrooms + Garlic Mashed Cauliflower",cal:530, desc:"Seared sirloin finished in oven. Roasted mushrooms with thyme and butter. Creamy garlic mashed cauliflower.", prep:"30 min", tags:["protein","meat"] },
    ],
    notes:"Slice extra pork for Friday's wrap.",
  },
  { day:"Friday",    date:"Day 6",  theme:"Strong Finish",
    breakfasts:[
      { meal:"Avocado Toast + Soft-Boiled Egg",      cal:400, desc:"Whole grain toast with smashed avocado, everything bagel seasoning, soft-boiled egg on top, chili flakes.", prep:"7 min",  tags:["protein","fiber"] },
      { meal:"Dark Cherry Recovery Smoothie",        cal:330, desc:"Blend: 1 cup frozen dark cherries, 1 scoop chocolate protein, 1 tbsp almond butter, 1 cup oat milk, 1 tsp cocoa.", prep:"3 min",  tags:["protein","fiber","shake"] },
      { meal:"Hard-Boiled Eggs + Apple + Almond Butter", cal:300, desc:"2 hard-boiled eggs + 1 apple with almond butter. 30-second breakfast.", prep:"0 min",  tags:["protein","easy"] },
    ],
    lunches:[
      { meal:"Pork & Veggie Wrap (Leftover)",        cal:400, desc:"Thursday's pork in a whole wheat tortilla with arugula, roasted red peppers, dijon.", prep:"3 min",  tags:["protein","meat","easy"] },
      { meal:"Turkey & Avocado Club Sandwich",       cal:450, desc:"Whole grain bread, sliced turkey, avocado, romaine, tomato, turkey bacon, dijon.", prep:"5 min",  tags:["protein","meat"] },
      { meal:"Protein Mason Jar Salad",              cal:390, desc:"Chickpeas, cucumber, cherry tomatoes, feta, romaine, lemon-tahini dressing. Shake and eat.", prep:"5 min",  tags:["protein","fiber"] },
    ],
    dinners:[
      { meal:"Sheet Pan Steak + Roasted Veggies + Baby Potatoes",       cal:580, desc:"Flank steak with garlic, rosemary, black pepper. Roast baby potatoes and bell peppers at 425F. Sear steak 4 min per side.", prep:"35 min", tags:["protein","fiber","meat"] },
      { meal:"Bison Burger + Sweet Potato Fries + Arugula Salad",       cal:560, desc:"Lean ground bison burger on whole grain bun with caramelized onions, lettuce, tomato. Air-fried sweet potato fries.", prep:"30 min", tags:["protein","meat"] },
      { meal:"Air Fryer Chicken Wings + Celery Sticks + Blue Cheese Dip",cal:560, desc:"Chicken wings in garlic parmesan or hot sauce, air fried at 400F for 22 min. Crispy and saucy.", prep:"30 min", tags:["protein","meat"] },
      { meal:"Grilled Salmon + Cucumber Dill Salad + Lemon Rice",       cal:520, desc:"Salmon grilled with lemon and herbs. Cool cucumber dill salad with red onion and Greek yogurt. Fluffy lemon rice.", prep:"25 min", tags:["protein","fish"] },
      { meal:"Turkey Meatball Sub + Roasted Peppers + Arugula",         cal:540, desc:"Turkey meatballs in marinara on a whole grain hoagie with mozzarella, roasted peppers, arugula. Broiled until bubbly.", prep:"30 min", tags:["protein","meat"] },
    ],
    notes:"You made it through Week 1!",
  },
  { day:"Saturday",  date:"Day 7",  theme:"Weekend Reward",
    breakfasts:[
      { meal:"Full Egg & Veggie Frittata",           cal:420, desc:"6 eggs with baby spinach, cherry tomatoes, goat cheese. Pour into oven-safe skillet, bake at 375F for 18 min.", prep:"25 min", tags:["protein","fiber"] },
      { meal:"Protein Pancakes + Greek Yogurt + Berries", cal:410, desc:"1 scoop protein + 1 mashed banana + 2 eggs. Cook as pancakes. Top with Greek yogurt and fresh berries.", prep:"12 min", tags:["protein"] },
      { meal:"Acai Smoothie Bowl",                   cal:400, desc:"Thick blend: frozen acai packet, frozen banana, protein powder, almond milk. Top with granola, hemp seeds, almond butter.", prep:"8 min",  tags:["protein","fiber","shake"] },
    ],
    lunches:[
      { meal:"Big Cobb Salad",                       cal:450, desc:"Romaine, grilled chicken, hard-boiled egg, avocado, cherry tomatoes, turkey bacon, blue cheese. Olive oil and red wine vinegar.", prep:"10 min", tags:["protein","meat"] },
      { meal:"Big Protein Power Salad",              cal:470, desc:"Mixed greens + hard-boiled eggs + avocado + quinoa + roasted chickpeas + tahini lemon dressing.", prep:"10 min", tags:["protein","fiber"] },
      { meal:"Grilled Chicken Caesar Salad",         cal:420, desc:"Romaine, grilled chicken breast, shaved parmesan, whole grain croutons, light Caesar dressing.", prep:"10 min", tags:["protein","meat"] },
    ],
    dinners:[
      { meal:"Herb-Crusted Rack of Lamb + Chimichurri + Roasted Fingerlings",cal:620, desc:"Herb-crusted rack of lamb, oven-finished. Chimichurri: parsley, garlic, olive oil, red wine vinegar. Crispy fingerling potatoes.", prep:"40 min", tags:["protein","meat"] },
      { meal:"NY Strip Steak + Truffle Butter + Roasted Asparagus",     cal:650, desc:"Perfectly seared NY strip with truffle butter. Asparagus roasted with lemon. A real Saturday dinner.", prep:"25 min", tags:["protein","meat"] },
      { meal:"Whole Roasted Chicken + Root Vegetables + Pan Gravy",     cal:580, desc:"Golden whole roasted chicken with root vegetables (carrots, parsnips, onion) and a simple pan gravy.", prep:"70 min", tags:["protein","fiber","meat"] },
      { meal:"Surf & Turf Filet Mignon + Butter Shrimp + Asparagus", cal:650, desc:"Petite filet seared to your liking. Garlic butter shrimp alongside. Asparagus roasted with lemon.", prep:"35 min", tags:["protein","fish","meat"] },
      { meal:"Celebration Ribeye + Crispy Fingerlings + Creamed Spinach",cal:680, desc:"Beautifully seared ribeye. Crispy fingerlings. Lightened creamed spinach with Greek yogurt.", prep:"40 min", tags:["protein","meat"] },
    ],
    notes:"Week 2 starts tomorrow. Grocery list prep tonight.",
  },
];

const CLASS_WEEK2 = [
  { day:"Sunday",    date:"Day 8",  theme:"Week 2 Strong",
    breakfasts:[
      { meal:"Green Protein Smoothie",               cal:320, desc:"Blend: 1 cup frozen spinach, 1 frozen banana, 1 scoop vanilla protein, 1 tbsp almond butter, 1 cup almond milk.", prep:"3 min",  tags:["protein","fiber","shake"] },
      { meal:"Veggie Egg Scramble + Toast",          cal:390, desc:"3 eggs scrambled with baby spinach, cherry tomatoes, feta. Whole grain toast with avocado.", prep:"10 min", tags:["protein"] },
      { meal:"Greek Yogurt Parfait",                 cal:340, desc:"Plain Greek yogurt + frozen berries + chia seeds + granola + honey.", prep:"3 min",  tags:["protein","fiber","easy"] },
    ],
    lunches:[
      { meal:"Chicken & White Bean Soup (batch cook)", cal:370, desc:"Diced chicken, white beans, chicken broth, celery, carrots, garlic, thyme. Big pot, eats all week.", prep:"25 min", tags:["protein","fiber","meat"] },
      { meal:"Big Cobb Salad",                       cal:450, desc:"Romaine, grilled chicken, hard-boiled egg, avocado, cherry tomatoes, turkey bacon, feta.", prep:"10 min", tags:["protein","meat"] },
      { meal:"Turkey & Avocado Wrap",                cal:410, desc:"Whole wheat tortilla, deli turkey, avocado, arugula, mustard, sliced tomato.", prep:"4 min",  tags:["protein","meat","easy"] },
    ],
    dinners:[
      { meal:"Baked BBQ Chicken Thighs + Roasted Corn + Coleslaw",     cal:540, desc:"Chicken thighs with clean BBQ sauce, baked at 400F for 35 min. Roasted corn. Lightened coleslaw.", prep:"40 min", tags:["protein","meat"] },
      { meal:"Slow Cooker Pulled Turkey + Brown Rice + Roasted Sweet Potato",cal:520, desc:"Turkey breast slow-cooked in BBQ and chicken broth until pull-apart tender. Shredded over brown rice.", prep:"30 min", tags:["protein","fiber","meat"] },
      { meal:"Air Fryer Chicken Wings + Celery + Blue Cheese Dip",     cal:560, desc:"Chicken wings in garlic parmesan or hot sauce, air fried at 400F for 22 min.", prep:"30 min", tags:["protein","meat"] },
      { meal:"Honey Garlic Salmon + Roasted Sweet Potatoes + Broccolini",cal:530, desc:"Salmon with honey, garlic, tamari glaze. Sweet potato wedges and broccolini at 425F.", prep:"30 min", tags:["protein","fiber","fish"] },
      { meal:"Stuffed Bell Peppers with Ground Turkey & Brown Rice",   cal:530, desc:"Peppers filled with ground turkey, brown rice, diced tomatoes, cumin, cheddar. Bake at 375F for 30 min.", prep:"40 min", tags:["protein","fiber","meat"] },
    ],
    notes:"Hard-boil 6 eggs tonight. Make overnight oats for Monday.",
  },
  { day:"Monday",    date:"Day 9",  theme:"Locked In",
    breakfasts:[
      { meal:"Overnight Oats with Berries",          cal:340, desc:"Made Sunday night: oats + milk + chia + PB + berries. Grab from fridge.", prep:"0 min",  tags:["fiber","easy"] },
      { meal:"Avocado Toast + Fried Eggs",           cal:410, desc:"Thick whole-grain toast, smashed avocado, 2 fried eggs on top, everything bagel seasoning.", prep:"8 min",  tags:["protein","fiber"] },
      { meal:"Mango Turmeric Smoothie",              cal:300, desc:"Blend: 1 cup frozen mango, half tsp turmeric, 1 scoop vanilla protein, 1 tbsp chia seeds, 1 cup coconut milk.", prep:"3 min",  tags:["protein","fiber","shake"] },
    ],
    lunches:[
      { meal:"Chicken & White Bean Soup (Leftover)", cal:360, desc:"Sunday's soup in a thermos. Squeeze of lemon on top. Gets better every day.", prep:"0 min",  tags:["protein","fiber","easy"] },
      { meal:"Turkey & Avocado Club Sandwich",       cal:450, desc:"Whole grain bread, sliced turkey, avocado, romaine, tomato, turkey bacon, dijon.", prep:"5 min",  tags:["protein","meat"] },
      { meal:"Protein Mason Jar Salad",              cal:390, desc:"Chickpeas, cucumber, cherry tomatoes, feta, romaine, lemon-tahini dressing. Shake and eat.", prep:"5 min",  tags:["protein","fiber"] },
    ],
    dinners:[
      { meal:"Stuffed Bell Peppers with Ground Turkey & Brown Rice",   cal:530, desc:"Peppers filled with ground turkey, brown rice, diced tomatoes, cumin, cheddar. Bake at 375F.", prep:"40 min", tags:["protein","fiber","meat"] },
      { meal:"Spaghetti Squash + Turkey Bolognese",                    cal:490, desc:"Roasted spaghetti squash topped with rich ground turkey bolognese sauce. Parmesan finish.", prep:"45 min", tags:["protein","fiber","meat"] },
      { meal:"Baked Chicken Piccata + Roasted Broccoli + Orzo",        cal:510, desc:"Chicken breast in lemon-caper-white wine sauce. Roasted broccoli with garlic. Light orzo with olive oil.", prep:"30 min", tags:["protein","meat"] },
      { meal:"Lean Beef Tacos + Black Beans + Avocado + Pico",         cal:530, desc:"Seasoned lean ground beef in warm corn tortillas. Black beans, fresh pico de gallo, avocado, Greek yogurt crema.", prep:"20 min", tags:["protein","fiber","meat"] },
      { meal:"Turkey Chili + Cornbread + Greek Yogurt",                cal:550, desc:"Hearty turkey chili with kidney beans, diced tomatoes, cumin, chipotle. Lightened cornbread. Greek yogurt instead of sour cream.", prep:"35 min", tags:["protein","fiber","meat"] },
    ],
    notes:"Make extra turkey filling for Tuesday's lunch bowl.",
  },
  { day:"Tuesday",   date:"Day 10", theme:"Dialed In",
    breakfasts:[
      { meal:"Hard-Boiled Eggs + Apple + Almond Butter", cal:300, desc:"2 eggs from Sunday's batch + 1 apple with almond butter. 30-second breakfast.", prep:"0 min",  tags:["protein","easy"] },
      { meal:"Cottage Cheese Bowl + Fruit",          cal:290, desc:"1 cup cottage cheese + sliced peaches + hemp seeds + cinnamon. High protein, zero effort.", prep:"2 min",  tags:["protein","easy"] },
      { meal:"PB Banana Protein Shake",              cal:370, desc:"Blend: 1 frozen banana, 2 tbsp PB, 1 scoop chocolate protein, 1 tbsp ground flax, 1 cup oat milk.", prep:"3 min",  tags:["protein","fiber","shake"] },
    ],
    lunches:[
      { meal:"Turkey Stuffed Pepper Bowl (Leftover)", cal:410, desc:"Monday's filling over a bed of greens with hot sauce and extra cheese. No reheating needed.", prep:"2 min",  tags:["protein","fiber","easy"] },
      { meal:"Tuna Salad on Whole Grain Crackers",   cal:320, desc:"Canned tuna with mayo, dijon, celery, lemon. On crackers with carrot sticks.", prep:"4 min",  tags:["protein","fish","easy"] },
      { meal:"Grilled Chicken & Avocado BLT",        cal:440, desc:"Whole grain bread, grilled chicken, avocado, turkey bacon, romaine, tomato, dijon.", prep:"7 min",  tags:["protein","meat"] },
    ],
    dinners:[
      { meal:"Air Fryer Chicken Tenders + Sweet Potato Fries + Honey Mustard",cal:510, desc:"Chicken tenders in panko and parmesan, air fried at 400F for 12 min. Sweet potato fries alongside.", prep:"25 min", tags:["protein","meat"] },
      { meal:"Lean Beef Tacos + Black Beans + Avocado + Pico",         cal:530, desc:"Seasoned lean ground beef in warm corn tortillas. Black beans, fresh pico de gallo, avocado.", prep:"20 min", tags:["protein","fiber","meat"] },
      { meal:"Turkey Chili + Cornbread + Greek Yogurt",                cal:550, desc:"Hearty turkey chili with kidney beans, diced tomatoes, cumin, chipotle. Lightened cornbread.", prep:"35 min", tags:["protein","fiber","meat"] },
      { meal:"Baked Salmon + Quinoa + Roasted Brussels Sprouts",       cal:530, desc:"Salmon with dijon, honey, lemon. Brussels sprouts halved, roasted at 425F. Fluffy quinoa.", prep:"30 min", tags:["protein","fiber","fish"] },
      { meal:"Chicken Stir-Fry + Broccoli + Snap Peas + Brown Rice",   cal:490, desc:"Chicken strips stir-fried with broccoli, snap peas, bell pepper in ginger-tamari sauce. Brown rice.", prep:"20 min", tags:["protein","fiber","meat"] },
    ],
    notes:"You are over halfway, keep going.",
  },
  { day:"Wednesday", date:"Day 11", theme:"Fiber Focus",
    breakfasts:[
      { meal:"Avocado Toast + Soft-Boiled Egg",      cal:400, desc:"Whole grain toast with smashed avocado, everything bagel seasoning, soft-boiled egg on top.", prep:"7 min",  tags:["protein","fiber"] },
      { meal:"Strawberry Protein Smoothie",          cal:330, desc:"Blend: 1 cup frozen strawberries, 1 scoop vanilla protein, 1 cup Greek yogurt, half cup almond milk.", prep:"3 min",  tags:["protein","fiber","shake"] },
      { meal:"Full Breakfast Spread",                cal:480, desc:"2 eggs any style, 2 strips turkey bacon, avocado toast on thick whole grain bread, side of mixed fruit.", prep:"15 min", tags:["protein","fiber"] },
    ],
    lunches:[
      { meal:"Chicken & White Bean Soup Last of Batch", cal:360, desc:"Finish the Sunday pot. Fresh parsley, drizzle of olive oil, whole grain crackers on the side.", prep:"0 min",  tags:["protein","fiber","easy"] },
      { meal:"Big Protein Power Salad",              cal:470, desc:"Mixed greens + hard-boiled eggs + avocado + quinoa + roasted chickpeas + tahini lemon dressing.", prep:"10 min", tags:["protein","fiber"] },
      { meal:"Turkey & Avocado Wrap",                cal:410, desc:"Whole wheat tortilla, deli turkey, avocado, arugula, mustard, sliced tomato. Pack and go.", prep:"4 min",  tags:["protein","meat","easy"] },
    ],
    dinners:[
      { meal:"Baked Salmon + Quinoa + Roasted Brussels Sprouts",       cal:530, desc:"Salmon with dijon, honey, lemon. Brussels sprouts halved, roasted at 425F. Fluffy quinoa.", prep:"30 min", tags:["protein","fiber","fish"] },
      { meal:"Chicken Stir-Fry + Broccoli + Snap Peas + Brown Rice",   cal:490, desc:"Chicken strips stir-fried with broccoli, snap peas, bell pepper in ginger-tamari sauce.", prep:"20 min", tags:["protein","fiber","meat"] },
      { meal:"Ground Turkey & Zucchini Boats + Parmesan Crust",        cal:460, desc:"Zucchini halves filled with seasoned ground turkey, diced tomatoes, mozzarella. Baked at 400F.", prep:"30 min", tags:["protein","fiber","meat"] },
      { meal:"Air Fryer Salmon Bites + Roasted Asparagus + Brown Rice",cal:510, desc:"Salmon cubed, tossed in olive oil, garlic, smoked paprika. Air fry at 400F for 8 min.", prep:"20 min", tags:["protein","fiber","fish"] },
      { meal:"Baked Pork Chops + Apple Slaw + Roasted Sweet Potato",   cal:540, desc:"Thick pork chops with garlic and smoked paprika at 400F. Fresh apple slaw. Sweet potato wedges.", prep:"35 min", tags:["protein","fiber","meat"] },
    ],
    notes:"Thursday grocery run, nearly there!",
  },
  { day:"Thursday",  date:"Day 12", theme:"Home Stretch",
    breakfasts:[
      { meal:"Banana Protein Shake",                 cal:330, desc:"Blend: 1 frozen banana, 1 scoop vanilla protein, 1 tbsp PB, 1 cup milk. Classic, fast, ~30g protein.", prep:"3 min",  tags:["protein","shake","easy"] },
      { meal:"Overnight Oats with Berries",          cal:340, desc:"Made last night: oats + milk + chia + PB + berries. Grab from fridge.", prep:"0 min",  tags:["fiber","easy"] },
      { meal:"Veggie Egg Scramble + Toast",          cal:390, desc:"3 eggs scrambled with baby spinach, cherry tomatoes, feta. Whole grain toast with avocado.", prep:"10 min", tags:["protein"] },
    ],
    lunches:[
      { meal:"Turkey & Avocado Club Sandwich",       cal:450, desc:"Whole grain bread, sliced turkey, avocado, romaine, tomato, turkey bacon, dijon.", prep:"5 min",  tags:["protein","meat"] },
      { meal:"Pork Chop Salad",                      cal:390, desc:"Slice leftover pork over arugula, cherry tomatoes, cucumber, feta. Olive oil and lemon dressing.", prep:"4 min",  tags:["protein","meat","easy"] },
      { meal:"Grilled Chicken & Avocado BLT",        cal:440, desc:"Whole grain bread, grilled chicken, avocado, turkey bacon, romaine, tomato, dijon.", prep:"7 min",  tags:["protein","meat"] },
    ],
    dinners:[
      { meal:"Baked Pork Chops + Apple Slaw + Roasted Sweet Potato",   cal:540, desc:"Thick pork chops with garlic and smoked paprika at 400F. Fresh apple slaw. Sweet potato wedges.", prep:"35 min", tags:["protein","fiber","meat"] },
      { meal:"Chicken Thighs + White Bean Ragu + Wilted Greens",       cal:510, desc:"Seared chicken thighs over white bean ragu with garlic, broth, sage, tomatoes. Wilted greens with olive oil.", prep:"35 min", tags:["protein","fiber","meat"] },
      { meal:"Sirloin Steak + Roasted Mushrooms + Garlic Mashed Cauliflower",cal:530, desc:"Seared sirloin finished in oven. Roasted mushrooms with thyme and butter. Creamy garlic mashed cauliflower.", prep:"30 min", tags:["protein","meat"] },
      { meal:"Baked BBQ Chicken Breast + Roasted Corn + Coleslaw",     cal:510, desc:"Chicken breast with clean BBQ sauce at 400F for 25 min. Roasted corn. Light Greek yogurt coleslaw.", prep:"30 min", tags:["protein","meat"] },
      { meal:"Grilled Salmon + Cucumber Dill Salad + Lemon Rice",      cal:520, desc:"Salmon grilled with lemon and herbs. Cool cucumber dill salad. Fluffy lemon rice.", prep:"25 min", tags:["protein","fish"] },
    ],
    notes:"Save one pork chop for Friday's salad.",
  },
  { day:"Friday",    date:"Day 13", theme:"Final Push",
    breakfasts:[
      { meal:"Greek Yogurt Bowl with Granola & Banana", cal:320, desc:"Plain Greek yogurt, sliced banana, low-sugar granola, drizzle of honey.", prep:"2 min",  tags:["protein","easy"] },
      { meal:"Dark Cherry Recovery Smoothie",        cal:330, desc:"Blend: 1 cup frozen dark cherries, 1 scoop chocolate protein, 1 tbsp almond butter, 1 cup oat milk.", prep:"3 min",  tags:["protein","fiber","shake"] },
      { meal:"Avocado Toast + Fried Eggs",           cal:410, desc:"Thick whole-grain toast, smashed avocado with red pepper flakes, 2 fried eggs on top.", prep:"8 min",  tags:["protein","fiber"] },
    ],
    lunches:[
      { meal:"Pork Chop Salad (Leftover)",           cal:390, desc:"Slice leftover pork over arugula, cherry tomatoes, cucumber, feta. Olive oil and lemon dressing.", prep:"4 min",  tags:["protein","meat","easy"] },
      { meal:"Turkey & Avocado Wrap",                cal:410, desc:"Whole wheat tortilla, deli turkey, avocado, arugula, mustard, sliced tomato.", prep:"4 min",  tags:["protein","meat","easy"] },
      { meal:"Big Protein Power Salad",              cal:470, desc:"Mixed greens + hard-boiled eggs + avocado + quinoa + roasted chickpeas + tahini lemon dressing.", prep:"10 min", tags:["protein","fiber"] },
    ],
    dinners:[
      { meal:"Air Fryer Chicken Wings + Celery Sticks + Blue Cheese Dip",cal:560, desc:"Chicken wings in hot sauce or garlic parmesan, air fried at 400F for 22 min.", prep:"30 min", tags:["protein","meat"] },
      { meal:"Grilled Salmon + Cucumber Dill Salad + Lemon Rice",      cal:520, desc:"Salmon grilled with lemon and herbs. Cool cucumber dill salad. Fluffy lemon rice.", prep:"25 min", tags:["protein","fish"] },
      { meal:"Turkey Meatball Sub + Roasted Peppers + Arugula",        cal:540, desc:"Turkey meatballs in marinara on whole grain hoagie with mozzarella, roasted peppers, arugula. Broiled until bubbly.", prep:"30 min", tags:["protein","meat"] },
      { meal:"Baked Pork Chops + Apple Slaw + Roasted Sweet Potato",   cal:540, desc:"Thick pork chops with garlic and smoked paprika. Fresh apple slaw. Sweet potato wedges.", prep:"35 min", tags:["protein","fiber","meat"] },
      { meal:"Chicken Thighs + White Bean Ragu + Wilted Greens",       cal:510, desc:"Seared chicken thighs over white bean ragu with garlic, broth, sage, tomatoes.", prep:"35 min", tags:["protein","fiber","meat"] },
    ],
    notes:"One day left, make it count.",
  },
  { day:"Saturday",  date:"Day 14", theme:"Celebration!",
    breakfasts:[
      { meal:"Full Egg & Veggie Frittata",           cal:420, desc:"6 eggs with baby spinach, cherry tomatoes, goat cheese. Bake at 375F for 18 min. Slice like a pizza.", prep:"25 min", tags:["protein","fiber"] },
      { meal:"Protein Pancakes + Greek Yogurt + Berries", cal:410, desc:"1 scoop protein + 1 mashed banana + 2 eggs. Cook as pancakes. Top with Greek yogurt and berries.", prep:"12 min", tags:["protein"] },
      { meal:"Acai Smoothie Bowl",                   cal:400, desc:"Thick blend: frozen acai packet, frozen banana, protein powder, almond milk. Top with granola, hemp seeds, almond butter.", prep:"8 min",  tags:["protein","fiber","shake"] },
    ],
    lunches:[
      { meal:"Big Protein Power Salad",              cal:470, desc:"Mixed greens + hard-boiled eggs + grilled chicken + avocado + quinoa + roasted chickpeas + tahini lemon dressing.", prep:"10 min", tags:["protein","fiber","meat"] },
      { meal:"Big Cobb Salad",                       cal:450, desc:"Romaine, grilled chicken, hard-boiled egg, avocado, cherry tomatoes, turkey bacon, blue cheese.", prep:"10 min", tags:["protein","meat"] },
      { meal:"Grilled Chicken Caesar Salad",         cal:420, desc:"Romaine, grilled chicken breast, shaved parmesan, whole grain croutons, light Caesar dressing.", prep:"10 min", tags:["protein","meat"] },
    ],
    dinners:[
      { meal:"Celebration Ribeye + Crispy Fingerlings + Creamed Spinach",cal:680, desc:"Beautifully seared ribeye. Crispy fingerlings. Lightened creamed spinach with Greek yogurt. You earned every bite.", prep:"40 min", tags:["protein","meat"] },
      { meal:"Whole Roasted Chicken + Root Vegetables + Pan Gravy",    cal:590, desc:"Golden whole roasted chicken with root vegetables and simple pan gravy. Roasted carrots, parsnips, onions.", prep:"70 min", tags:["protein","fiber","meat"] },
      { meal:"Surf & Turf Filet Mignon + Butter Shrimp + Asparagus",cal:650, desc:"Petite filet seared to your liking. Garlic butter shrimp alongside. Asparagus roasted with lemon.", prep:"35 min", tags:["protein","fish","meat"] },
      { meal:"NY Strip Steak + Truffle Butter + Roasted Asparagus",    cal:650, desc:"Perfectly seared NY strip with a pat of truffle butter. Asparagus roasted with lemon.", prep:"25 min", tags:["protein","meat"] },
      { meal:"Herb-Crusted Rack of Lamb + Chimichurri + Roasted Fingerlings",cal:620, desc:"Herb-crusted rack of lamb, oven-finished. Chimichurri: parsley, garlic, olive oil, red wine vinegar.", prep:"40 min", tags:["protein","meat"] },
    ],
    notes:"Two full weeks of American done. Plan Week 3!",
  },
];

// ─── PESCATARIAN DATA ─────────────────────────────────────────────────────────
const PESC_WEEK1 = [
  { day:"Sunday",    date:"Day 1",  theme:"Kickoff",
    breakfasts:[
      { meal:"Green Power Smoothie",cal:320,desc:"Blend: 1 cup frozen spinach, 1 frozen banana, 1 scoop vanilla protein, 1 tbsp almond butter, 1 cup almond milk, 1 tsp matcha.",prep:"3 min",tags:["shake","protein","fiber"] },
      { meal:"Greek Yogurt Parfait",cal:340,desc:"Plain Greek yogurt + frozen berries + chia seeds + granola + honey drizzle.",prep:"3 min",tags:["protein","fiber","easy"] },
      { meal:"Veggie Egg Scramble + Toast",cal:390,desc:"2 eggs scrambled with baby spinach and cherry tomatoes. Whole grain toast with avocado.",prep:"8 min",tags:["protein"] },
    ],
    lunches:[
      { meal:"White Bean & Avocado Smash Wrap",cal:410,desc:"Mash canned white beans with avocado, lemon, red pepper flakes. Spread in whole wheat tortilla with arugula and cucumber.",prep:"5 min",tags:["protein","fiber","veg"] },
      { meal:"Chickpea Mason Jar Salad",cal:390,desc:"Layer: lemon-tahini dressing, chickpeas, cherry tomatoes, cucumber, roasted red pepper, feta, romaine. Shake and eat.",prep:"5 min",tags:["protein","fiber","veg"] },
      { meal:"Tuna & White Bean Lettuce Cups",cal:360,desc:"Canned albacore tuna + white beans + capers + lemon + olive oil + dijon. Scoop into romaine leaves.",prep:"5 min",tags:["protein","fish"] },
    ],
    dinners:[
      { meal:"Honey Garlic Salmon + Roasted Sweet Potato + Broccolini",cal:520,desc:"Salmon glazed with honey, garlic, tamari. Sweet potato wedges and broccolini on same sheet pan at 425F.",prep:"30 min",tags:["protein","fish"] },
      { meal:"Lemon Butter Shrimp + Cauliflower Rice + Asparagus",cal:440,desc:"Shrimp sauteed in lemon butter and garlic. Cauliflower rice with herbs. Roasted asparagus.",prep:"20 min",tags:["protein","fish"] },
      { meal:"Miso Cod + Bok Choy + Brown Rice",cal:490,desc:"Cod fillets glazed with white miso and honey, broiled 10 min. Stir-fried bok choy. Brown rice base.",prep:"25 min",tags:["protein","fish","fiber"] },
      { meal:"Ahi Tuna Poke Bowl + Edamame + Cucumber + Rice",cal:490,desc:"Sushi-grade tuna cubed, marinated in tamari, sesame oil, sriracha. Over rice with edamame, cucumber, avocado.",prep:"15 min",tags:["protein","fish"] },
      { meal:"Spicy Shrimp Tacos + Cabbage Slaw + Lime Crema",cal:490,desc:"Shrimp tossed in chili, cumin, garlic, sauteed 4 min. Corn tortillas, purple cabbage, lime crema.",prep:"20 min",tags:["protein","fish"] },
    ],
    notes:"Boil 6 eggs tonight, they will carry you through the week.",
  },
  { day:"Monday",    date:"Day 2",  theme:"Fuel Up",
    breakfasts:[
      { meal:"Triple Berry Protein Shake",cal:350,desc:"Blend: 1 cup frozen mixed berries, 1 scoop protein, 1 cup Greek yogurt, 1 tbsp chia seeds, half cup milk. ~40g protein.",prep:"3 min",tags:["shake","protein","fiber"] },
      { meal:"Avocado Toast + Soft-Boiled Egg",cal:380,desc:"Whole grain toast with smashed avocado, red pepper flakes, sea salt, and a soft-boiled egg on top.",prep:"7 min",tags:["protein","fiber"] },
      { meal:"Cottage Cheese Bowl + Fruit",cal:280,desc:"1 cup cottage cheese + sliced peaches + hemp seeds + cinnamon. High protein, zero effort.",prep:"2 min",tags:["protein","easy"] },
    ],
    lunches:[
      { meal:"Chickpea Mason Jar Salad",cal:390,desc:"Layer: lemon-tahini dressing, chickpeas, cherry tomatoes, cucumber, roasted red pepper, feta, romaine. Shake and eat.",prep:"5 min",tags:["protein","fiber","veg"] },
      { meal:"Edamame & Brown Rice Bowl",cal:420,desc:"Brown rice + edamame + shredded carrots + avocado + tamari and sesame oil drizzle. Everything bagel seasoning.",prep:"4 min",tags:["protein","fiber","veg"] },
      { meal:"Hard-Boiled Egg & Avocado Box",cal:340,desc:"2 hard-boiled eggs + half avocado + cherry tomatoes + whole grain crackers. Pack in a bento box.",prep:"2 min",tags:["protein","easy"] },
    ],
    dinners:[
      { meal:"Miso-Glazed Cod + Edamame Slaw + Brown Rice",cal:510,desc:"Cod coated in white miso, honey, rice vinegar, broil 10 min. Slaw: cabbage, edamame, sesame oil.",prep:"25 min",tags:["protein","fish","fiber"] },
      { meal:"Teriyaki Salmon Bowl + Snap Peas + Quinoa",cal:540,desc:"Salmon glazed with soy, mirin, honey. Snap peas sauteed with garlic. Served over fluffy quinoa.",prep:"25 min",tags:["protein","fish"] },
      { meal:"Garlic Shrimp & Zucchini Noodles + Cherry Tomatoes",cal:380,desc:"Shrimp in garlic butter and white wine over spiralized zucchini. Burst cherry tomatoes, fresh basil.",prep:"20 min",tags:["protein","fish"] },
      { meal:"Lemon Herb Salmon + Quinoa + Sauteed Spinach",cal:510,desc:"Salmon baked with olive oil, lemon zest, fresh dill, capers at 400F for 15 min. Garlicky spinach. Quinoa.",prep:"25 min",tags:["protein","fish","fiber"] },
      { meal:"Black Bean & Sweet Potato Enchilada Bowls",cal:520,desc:"Roast sweet potato with chili powder. Layer over brown rice with black beans, enchilada sauce, cheddar.",prep:"35 min",tags:["protein","fiber","veg"] },
    ],
    notes:"Make overnight oats tonight for Tuesday morning.",
  },
  { day:"Tuesday",   date:"Day 3",  theme:"Steady",
    breakfasts:[
      { meal:"PB Banana Protein Shake",cal:380,desc:"Blend: 1 frozen banana, 2 tbsp PB, 1 scoop chocolate protein, 1 tbsp flax, 1 cup oat milk. Tastes like dessert.",prep:"3 min",tags:["shake","protein","fiber"] },
      { meal:"Overnight Oats",cal:360,desc:"Made last night: oats + milk + chia + PB + berries on top. Grab from fridge. Zero morning effort.",prep:"0 min",tags:["fiber","easy"] },
      { meal:"Hard-Boiled Eggs + Apple",cal:220,desc:"2 hard-boiled eggs + 1 apple. Grab and go.",prep:"0 min",tags:["protein","easy"] },
    ],
    lunches:[
      { meal:"Edamame & Brown Rice Bowl",cal:420,desc:"Brown rice + edamame + shredded carrots + avocado + tamari and sesame oil. Everything bagel seasoning.",prep:"4 min",tags:["protein","fiber","veg"] },
      { meal:"Tuna & White Bean Lettuce Cups",cal:360,desc:"Canned albacore tuna + white beans + capers + lemon + olive oil + dijon. Scoop into romaine leaves.",prep:"5 min",tags:["protein","fish"] },
      { meal:"White Bean & Avocado Smash Wrap",cal:410,desc:"Mash canned white beans with avocado, lemon, red pepper flakes. Spread in whole wheat tortilla with arugula.",prep:"5 min",tags:["protein","fiber","veg"] },
    ],
    dinners:[
      { meal:"Spicy Shrimp Tacos + Cabbage Slaw + Lime Crema",cal:490,desc:"Shrimp tossed in chili, cumin, garlic, sauteed 4 min. Corn tortillas, purple cabbage, lime crema.",prep:"20 min",tags:["protein","fish"] },
      { meal:"Blackened Salmon + Roasted Corn Salsa + Brown Rice",cal:530,desc:"Salmon with bold blackening spices. Roasted corn salsa: corn, red onion, jalapeno, lime. Brown rice.",prep:"25 min",tags:["protein","fish"] },
      { meal:"Coconut Curry Shrimp + Jasmine Rice + Spinach",cal:520,desc:"Shrimp simmered in light coconut milk, red curry paste, ginger, garlic. Wilted spinach. Jasmine rice.",prep:"25 min",tags:["protein","fish","fiber"] },
      { meal:"Pan-Seared Cod + White Bean Ragu + Wilted Kale",cal:460,desc:"Cod seared golden. White bean ragu: beans, garlic, cherry tomatoes, white wine, thyme. Wilted kale.",prep:"25 min",tags:["protein","fish","fiber"] },
      { meal:"Sesame Crusted Ahi Tuna + Bok Choy + Miso Soup",cal:450,desc:"Ahi coated in sesame seeds, seared 60 sec per side. Bok choy stir-fried with garlic. Quick miso soup.",prep:"20 min",tags:["protein","fish"] },
    ],
    notes:"Cook extra brown rice tonight for Wednesday lunch.",
  },
  { day:"Wednesday", date:"Day 4",  theme:"Halfway",
    breakfasts:[
      { meal:"Tropical Greens Smoothie",cal:310,desc:"Blend: 1 cup frozen mango, half cup frozen pineapple, 1 cup baby spinach, 1 scoop vanilla protein, 1 tbsp hemp seeds, 1 cup coconut water.",prep:"3 min",tags:["shake","protein","fiber"] },
      { meal:"Veggie Egg Scramble + Toast",cal:390,desc:"2 eggs scrambled with baby spinach and cherry tomatoes. Whole grain toast with avocado.",prep:"8 min",tags:["protein"] },
      { meal:"Greek Yogurt Parfait",cal:340,desc:"Plain Greek yogurt + frozen berries + chia seeds + granola + honey.",prep:"3 min",tags:["protein","fiber","easy"] },
    ],
    lunches:[
      { meal:"Leftover Rice Bowl Remix",cal:380,desc:"Tuesday's rice + canned black beans + salsa + feta. Microwave 90 sec. Add hot sauce.",prep:"2 min",tags:["protein","fiber","veg"] },
      { meal:"Smoked Salmon & Cucumber Stack",cal:310,desc:"Cucumber rounds topped with whipped cream cheese, smoked salmon, capers, dill, cracked pepper.",prep:"5 min",tags:["protein","fish","easy"] },
      { meal:"Chickpea Mason Jar Salad",cal:390,desc:"Layer: lemon-tahini dressing, chickpeas, cherry tomatoes, cucumber, roasted red pepper, feta, romaine.",prep:"5 min",tags:["protein","fiber","veg"] },
    ],
    dinners:[
      { meal:"Lemon Herb Salmon + Quinoa + Sauteed Spinach",cal:510,desc:"Salmon baked with olive oil, lemon zest, fresh dill, capers at 400F for 15 min. Garlicky spinach. Quinoa.",prep:"25 min",tags:["protein","fish","fiber"] },
      { meal:"Ahi Tuna Poke Bowl + Edamame + Cucumber + Rice",cal:490,desc:"Sushi-grade tuna cubed, marinated in tamari, sesame oil, sriracha. Over rice with edamame, cucumber, avocado.",prep:"15 min",tags:["protein","fish"] },
      { meal:"Pan-Seared Cod + White Bean Ragu + Wilted Kale",cal:460,desc:"Cod seared golden. White bean ragu: beans, garlic, cherry tomatoes, white wine, thyme. Wilted kale.",prep:"25 min",tags:["protein","fish","fiber"] },
      { meal:"Garlic Butter Shrimp over Chickpea Pasta",cal:510,desc:"Shrimp in garlic, butter, white wine, lemon. Over chickpea pasta. Finish with parmesan and parsley.",prep:"20 min",tags:["protein","fish"] },
      { meal:"Black Bean & Sweet Potato Enchilada Bowls",cal:520,desc:"Roast sweet potato with chili powder. Layer over brown rice with black beans, enchilada sauce, cheddar.",prep:"35 min",tags:["protein","fiber","veg"] },
    ],
    notes:"Thursday grocery run, check the list before you go.",
  },
  { day:"Thursday",  date:"Day 5",  theme:"Second Wind",
    breakfasts:[
      { meal:"Chocolate Greens Protein Shake",cal:340,desc:"Blend: 1 cup frozen spinach, 1 tbsp cocoa, 1 scoop chocolate protein, 1 tbsp almond butter, 1 cup oat milk.",prep:"3 min",tags:["shake","protein","fiber"] },
      { meal:"Avocado Toast + Fried Eggs",cal:410,desc:"Thick whole-grain toast, smashed avocado with red pepper flakes, 2 fried eggs on top.",prep:"8 min",tags:["protein","fiber"] },
      { meal:"Cottage Cheese Peach Shake",cal:280,desc:"Blend: half cup cottage cheese, half cup frozen peaches, 1 tbsp honey, half cup almond milk, half tsp vanilla. ~28g protein.",prep:"3 min",tags:["shake","protein"] },
    ],
    lunches:[
      { meal:"Tuna & White Bean Lettuce Cups",cal:360,desc:"Canned albacore tuna + white beans + capers + lemon + olive oil + dijon. Scoop into romaine leaves.",prep:"5 min",tags:["protein","fish"] },
      { meal:"Hard-Boiled Egg & Avocado Box",cal:340,desc:"2 hard-boiled eggs + half avocado + cherry tomatoes + whole grain crackers. Pack in a bento box.",prep:"2 min",tags:["protein","easy"] },
      { meal:"Edamame & Brown Rice Bowl",cal:420,desc:"Brown rice + edamame + shredded carrots + avocado + tamari and sesame oil. Everything bagel seasoning.",prep:"4 min",tags:["protein","fiber","veg"] },
    ],
    dinners:[
      { meal:"Black Bean & Sweet Potato Enchilada Bowls",cal:520,desc:"Roast sweet potato with chili powder. Layer over brown rice with black beans, enchilada sauce, cheddar, Greek yogurt crema.",prep:"35 min",tags:["protein","fiber","veg"] },
      { meal:"Sesame Crusted Ahi Tuna + Bok Choy + Miso Soup",cal:450,desc:"Ahi coated in sesame seeds, seared 60 sec per side. Bok choy stir-fried with garlic. Quick miso soup.",prep:"20 min",tags:["protein","fish"] },
      { meal:"Shrimp Fried Cauliflower Rice + Edamame + Egg",cal:420,desc:"Cauliflower rice stir-fried with shrimp, edamame, scrambled egg, tamari, sesame oil, green onions.",prep:"20 min",tags:["protein","fish"] },
      { meal:"Honey Garlic Salmon + Roasted Sweet Potato + Broccolini",cal:520,desc:"Salmon glazed with honey, garlic, tamari. Sweet potato wedges and broccolini at 425F.",prep:"30 min",tags:["protein","fish"] },
      { meal:"Garlic Butter Shrimp over Chickpea Pasta",cal:510,desc:"Shrimp in garlic, butter, white wine, lemon. Over chickpea pasta. Parmesan and parsley finish.",prep:"20 min",tags:["protein","fish"] },
    ],
    notes:"Soak lentils overnight if making Friday's dinner.",
  },
  { day:"Friday",    date:"Day 6",  theme:"Strong Finish",
    breakfasts:[
      { meal:"Blueberry Flax Smoothie",cal:300,desc:"Blend: 1 cup frozen blueberries, 1 cup Greek yogurt, 1 tbsp ground flax, 1 tsp honey, half cup almond milk. ~30g protein.",prep:"3 min",tags:["shake","protein","fiber"] },
      { meal:"Overnight Oats",cal:360,desc:"Made last night: oats + milk + chia + PB + berries. Grab from fridge. Zero morning effort.",prep:"0 min",tags:["fiber","easy"] },
      { meal:"Hard-Boiled Eggs + Apple",cal:220,desc:"2 hard-boiled eggs + 1 apple. Grab and go.",prep:"0 min",tags:["protein","easy"] },
    ],
    lunches:[
      { meal:"Hard-Boiled Egg & Avocado Box",cal:340,desc:"2 hard-boiled eggs + half avocado + cherry tomatoes + whole grain crackers. Pack in a bento box.",prep:"2 min",tags:["protein","easy"] },
      { meal:"Smoked Salmon & Cucumber Stack",cal:310,desc:"Cucumber rounds topped with whipped cream cheese, smoked salmon, capers, dill, cracked pepper.",prep:"5 min",tags:["protein","fish","easy"] },
      { meal:"Chickpea Mason Jar Salad",cal:390,desc:"Layer: lemon-tahini dressing, chickpeas, cherry tomatoes, cucumber, roasted red pepper, feta, romaine.",prep:"5 min",tags:["protein","fiber","veg"] },
    ],
    dinners:[
      { meal:"Ahi Tuna Steak + Sesame Edamame + Miso Soup",cal:460,desc:"Ahi seared 90 sec per side. Sliced against the grain. Sesame edamame + quick miso soup.",prep:"20 min",tags:["protein","fish"] },
      { meal:"Salmon Nicoise Salad + Dijon Vinaigrette",cal:480,desc:"Seared salmon over romaine with green beans, hard-boiled egg, olives, cherry tomatoes, capers.",prep:"25 min",tags:["protein","fish","fiber"] },
      { meal:"Garlic Butter Scallops + Roasted Asparagus + Lemon Risotto",cal:560,desc:"Pan-seared scallops in brown butter and garlic. Asparagus roasted with lemon. Light lemon risotto.",prep:"35 min",tags:["protein","fish"] },
      { meal:"Coconut Curry Shrimp + Jasmine Rice + Spinach",cal:520,desc:"Shrimp simmered in coconut milk, red curry paste, ginger, garlic. Wilted spinach. Jasmine rice.",prep:"25 min",tags:["protein","fish","fiber"] },
      { meal:"Lemon Herb Salmon + Quinoa + Sauteed Spinach",cal:510,desc:"Salmon baked with olive oil, lemon zest, fresh dill at 400F. Garlicky spinach. Quinoa.",prep:"25 min",tags:["protein","fish","fiber"] },
    ],
    notes:"You made it through Week 1!",
  },
  { day:"Saturday",  date:"Day 7",  theme:"Weekend",
    breakfasts:[
      { meal:"Acai Smoothie Bowl",cal:410,desc:"Thick blend: frozen acai packet, frozen banana, protein powder, almond milk. Top with granola, sliced banana, hemp seeds, almond butter.",prep:"8 min",tags:["shake","protein","fiber"] },
      { meal:"Veggie Egg Scramble + Toast",cal:390,desc:"3 eggs scrambled with baby spinach and cherry tomatoes. Whole grain toast with avocado.",prep:"8 min",tags:["protein"] },
      { meal:"Golden Milk Smoothie Bowl",cal:390,desc:"Thick blend: frozen banana, half tsp turmeric, half tsp cinnamon, 1 scoop vanilla protein, half cup Greek yogurt. Top with granola and mango.",prep:"8 min",tags:["shake","protein","fiber"] },
    ],
    lunches:[
      { meal:"Big Feta & Chickpea Greek Salad",cal:390,desc:"Romaine, kalamata olives, cucumber, cherry tomatoes, red onion, feta, chickpeas. Olive oil + red wine vinegar + oregano.",prep:"8 min",tags:["protein","fiber","veg"] },
      { meal:"Burrata & White Bean Toast",cal:420,desc:"Thick whole-grain toast, smashed white beans with lemon and garlic, fresh burrata, cherry tomatoes, basil, olive oil, flaky salt.",prep:"8 min",tags:["protein","fiber","veg"] },
      { meal:"Tuna & White Bean Lettuce Cups",cal:360,desc:"Canned albacore tuna + white beans + capers + lemon + olive oil + dijon. Scoop into romaine leaves.",prep:"5 min",tags:["protein","fish"] },
    ],
    dinners:[
      { meal:"Whole Roasted Branzino + Herb Oil + Roasted Fennel",cal:510,desc:"Whole fish stuffed with lemon and herbs, roasted at 425F for 20 min. Fennel roasted alongside. Bright herb oil.",prep:"35 min",tags:["protein","fish"] },
      { meal:"Lobster Tacos + Mango Slaw + Chipotle Crema",cal:490,desc:"Butter-poached lobster tail in corn tortillas with mango slaw, chipotle Greek yogurt crema, cilantro.",prep:"30 min",tags:["protein","fish"] },
      { meal:"Seared Halibut + Brown Butter Capers + Roasted Beets + Farro",cal:530,desc:"Halibut seared in olive oil, finished with brown butter, capers, lemon. Roasted beets and nutty farro.",prep:"35 min",tags:["protein","fish","fiber"] },
      { meal:"Cioppino Seafood Stew + Crusty Bread",cal:520,desc:"Rich tomato broth loaded with shrimp, scallops, cod, clams. Fennel, garlic, white wine, fresh herbs. Crusty sourdough.",prep:"45 min",tags:["protein","fish","fiber"] },
      { meal:"Ahi Tuna Steak + Sesame Edamame + Miso Soup",cal:460,desc:"Ahi seared 90 sec per side. Sesame edamame. Quick miso soup from paste. A restaurant night at home.",prep:"20 min",tags:["protein","fish"] },
    ],
    notes:"Week 2 starts tomorrow, prep Sunday grocery list tonight.",
  },
];

const PESC_WEEK2 = [
  { day:"Sunday",    date:"Day 8",  theme:"Week 2 Begin",
    breakfasts:[
      { meal:"Matcha Almond Protein Shake",cal:310,desc:"Blend: 1 tsp matcha, 1 scoop vanilla protein, 1 tbsp almond butter, 1 cup almond milk, half frozen banana. Clean energy.",prep:"3 min",tags:["shake","protein"] },
      { meal:"Greek Yogurt Parfait",cal:340,desc:"Plain Greek yogurt + frozen berries + chia seeds + granola + honey.",prep:"3 min",tags:["protein","fiber","easy"] },
      { meal:"Avocado Toast + Soft-Boiled Egg",cal:380,desc:"Whole grain toast with smashed avocado, red pepper flakes, sea salt, and a soft-boiled egg on top.",prep:"7 min",tags:["protein","fiber"] },
    ],
    lunches:[
      { meal:"White Bean & Kale Soup batch cook",cal:350,desc:"Big pot: olive oil, garlic, white beans, veggie broth, kale, diced tomatoes, Italian seasoning, lemon. Simmer 20 min.",prep:"25 min",tags:["protein","fiber","veg"] },
      { meal:"Big Feta & Chickpea Greek Salad",cal:390,desc:"Romaine, kalamata olives, cucumber, cherry tomatoes, red onion, feta, chickpeas. Olive oil + red wine vinegar.",prep:"8 min",tags:["protein","fiber","veg"] },
      { meal:"Smoked Salmon & Cucumber Stack",cal:310,desc:"Cucumber rounds topped with whipped cream cheese, smoked salmon, capers, dill, cracked pepper.",prep:"5 min",tags:["protein","fish","easy"] },
    ],
    dinners:[
      { meal:"Teriyaki Salmon Bowl + Bok Choy + Brown Rice",cal:540,desc:"Salmon glazed with soy, mirin, honey. Stir-fry bok choy with garlic. Brown rice. Sesame seeds and pickled ginger.",prep:"30 min",tags:["protein","fish"] },
      { meal:"Miso Ramen with Soft-Boiled Egg + Shrimp + Nori",cal:520,desc:"Rich miso broth with ramen noodles, shrimp, soft-boiled egg, nori sheets, green onions, sesame oil.",prep:"25 min",tags:["protein","fish"] },
      { meal:"Baked Lemon Dill Salmon + Roasted Fingerlings + Green Beans",cal:500,desc:"Salmon with fresh dill, lemon, and capers baked at 400F. Fingerling potatoes roasted crispy. Green beans.",prep:"30 min",tags:["protein","fish","fiber"] },
      { meal:"Stuffed Bell Peppers with Lentils & Feta",cal:480,desc:"Bell peppers filled with green lentils, diced tomatoes, cumin, smoked paprika, crumbled feta. Baked at 375F.",prep:"40 min",tags:["protein","fiber","veg"] },
      { meal:"Shrimp & Grits with Roasted Peppers",cal:530,desc:"Creamy stone-ground grits topped with sauteed shrimp, roasted red peppers, garlic, and fresh parsley.",prep:"30 min",tags:["protein","fish"] },
    ],
    notes:"Hard-boil 6 eggs tonight.",
  },
  { day:"Monday",    date:"Day 9",  theme:"Locked In",
    breakfasts:[
      { meal:"Strawberry Basil Protein Smoothie",cal:330,desc:"Blend: 1 cup frozen strawberries, 3-4 fresh basil leaves, 1 scoop vanilla protein, 1 cup Greek yogurt, half cup almond milk.",prep:"3 min",tags:["shake","protein","fiber"] },
      { meal:"Overnight Oats",cal:360,desc:"Made last night: oats + milk + chia + PB + berries. Grab from fridge. Zero morning effort.",prep:"0 min",tags:["fiber","easy"] },
      { meal:"Hard-Boiled Eggs + Apple",cal:220,desc:"2 hard-boiled eggs + 1 apple. Grab and go.",prep:"0 min",tags:["protein","easy"] },
    ],
    lunches:[
      { meal:"White Bean Soup from Sunday",cal:340,desc:"Thermos or microwave. Add olive oil and parmesan on top. Soup gets better on day 2.",prep:"0 min",tags:["protein","fiber","easy"] },
      { meal:"Chickpea Mason Jar Salad",cal:390,desc:"Layer: lemon-tahini dressing, chickpeas, cherry tomatoes, cucumber, roasted red pepper, feta, romaine.",prep:"5 min",tags:["protein","fiber","veg"] },
      { meal:"Edamame & Brown Rice Bowl",cal:420,desc:"Brown rice + edamame + shredded carrots + avocado + tamari and sesame oil. Everything bagel seasoning.",prep:"4 min",tags:["protein","fiber","veg"] },
    ],
    dinners:[
      { meal:"Stuffed Bell Peppers with Lentils & Feta",cal:480,desc:"Bell peppers filled with green lentils, diced tomatoes, cumin, smoked paprika, crumbled feta. Baked at 375F.",prep:"40 min",tags:["protein","fiber","veg"] },
      { meal:"Shrimp & Grits with Roasted Peppers",cal:530,desc:"Creamy stone-ground grits topped with sauteed shrimp, roasted red peppers, garlic, and fresh parsley.",prep:"30 min",tags:["protein","fish"] },
      { meal:"Pan-Seared Cod + Olive Tapenade + Couscous + Roasted Zucchini",cal:470,desc:"Cod seared golden with olive tapenade on top. Herbed couscous. Zucchini roasted with lemon and thyme.",prep:"25 min",tags:["protein","fish","fiber"] },
      { meal:"Salmon Burgers + Sweet Potato Fries + Avocado Slaw",cal:560,desc:"Homemade salmon patties with dijon and herbs. Air-fried sweet potato fries. Creamy avocado-lime slaw.",prep:"30 min",tags:["protein","fish","fiber"] },
      { meal:"Garlic Butter Shrimp over Chickpea Pasta",cal:510,desc:"Shrimp in garlic, butter, white wine, lemon. Over chickpea pasta. Finish with parmesan and parsley.",prep:"20 min",tags:["protein","fish"] },
    ],
    notes:"Make extra lentil filling for Tuesday's lunch.",
  },
  { day:"Tuesday",   date:"Day 10", theme:"Dialed",
    breakfasts:[
      { meal:"Overnight Protein Oat Shake",cal:360,desc:"Night before: blend quarter cup rolled oats, 1 scoop protein, 1 tbsp PB, 1 cup oat milk, half banana. Refrigerate. Shake and drink.",prep:"0 min",tags:["shake","protein","fiber"] },
      { meal:"Veggie Egg Scramble + Toast",cal:390,desc:"2 eggs scrambled with baby spinach and cherry tomatoes. Whole grain toast with avocado.",prep:"8 min",tags:["protein"] },
      { meal:"Cottage Cheese Bowl + Fruit",cal:280,desc:"1 cup cottage cheese + sliced peaches + hemp seeds + cinnamon. High protein, zero effort.",prep:"2 min",tags:["protein","easy"] },
    ],
    lunches:[
      { meal:"Lentil Bowl Leftover",cal:370,desc:"Stuffed pepper filling over arugula with lemon squeeze and feta sprinkle. No reheating needed.",prep:"2 min",tags:["protein","fiber"] },
      { meal:"White Bean Soup",cal:340,desc:"From thermos or microwaved. Add a drizzle of olive oil on top.",prep:"0 min",tags:["protein","fiber","easy"] },
      { meal:"Tuna & White Bean Lettuce Cups",cal:360,desc:"Canned albacore tuna + white beans + capers + lemon + olive oil + dijon. Scoop into romaine leaves.",prep:"5 min",tags:["protein","fish"] },
    ],
    dinners:[
      { meal:"Garlic Butter Shrimp over Chickpea Pasta",cal:510,desc:"Shrimp in garlic, butter, white wine, lemon. Over chickpea pasta. Finish with parmesan and parsley.",prep:"20 min",tags:["protein","fish"] },
      { meal:"Seared Scallops + Pea Puree + Prosciutto Crisp",cal:470,desc:"Golden seared scallops over silky pea puree. Crispy prosciutto crumbled on top.",prep:"25 min",tags:["protein","fish"] },
      { meal:"Salmon Burgers + Sweet Potato Fries + Avocado Slaw",cal:560,desc:"Homemade salmon patties with dijon and herbs. Air-fried sweet potato fries. Avocado-lime slaw.",prep:"30 min",tags:["protein","fish","fiber"] },
      { meal:"Sesame Crusted Tuna + Quinoa Tabbouleh",cal:480,desc:"Ahi coated in sesame seeds, seared 60 sec per side. Quinoa tabbouleh: cucumber, parsley, mint, lemon.",prep:"25 min",tags:["protein","fish","fiber"] },
      { meal:"Coconut Curry Shrimp + Jasmine Rice + Spinach",cal:520,desc:"Shrimp simmered in coconut milk, red curry paste, ginger, garlic. Wilted spinach. Jasmine rice.",prep:"25 min",tags:["protein","fish","fiber"] },
    ],
    notes:"Cook extra shrimp for a quick Wednesday lunch option.",
  },
  { day:"Wednesday", date:"Day 11", theme:"Fiber Day",
    breakfasts:[
      { meal:"Mango Turmeric Recovery Shake",cal:300,desc:"Blend: 1 cup frozen mango, half tsp turmeric, quarter tsp black pepper, 1 scoop vanilla protein, 1 tbsp chia seeds, 1 cup coconut milk.",prep:"3 min",tags:["shake","protein","fiber"] },
      { meal:"Avocado Toast + Soft-Boiled Egg",cal:380,desc:"Whole grain toast with smashed avocado, red pepper flakes, sea salt, soft-boiled egg on top.",prep:"7 min",tags:["protein","fiber"] },
      { meal:"Greek Yogurt Parfait",cal:340,desc:"Plain Greek yogurt + frozen berries + chia seeds + granola + honey.",prep:"3 min",tags:["protein","fiber","easy"] },
    ],
    lunches:[
      { meal:"White Bean Soup Last of Batch",cal:340,desc:"Finish the Sunday pot. Squeeze fresh lemon, top with olive oil and whole grain bread for dipping.",prep:"0 min",tags:["protein","fiber","easy"] },
      { meal:"Edamame & Brown Rice Bowl",cal:420,desc:"Brown rice + edamame + shredded carrots + avocado + tamari and sesame oil. Everything bagel seasoning.",prep:"4 min",tags:["protein","fiber","veg"] },
      { meal:"Smoked Salmon & Cucumber Stack",cal:310,desc:"Cucumber rounds topped with whipped cream cheese, smoked salmon, capers, dill, cracked pepper.",prep:"5 min",tags:["protein","fish","easy"] },
    ],
    dinners:[
      { meal:"Sesame Crusted Tuna + Quinoa Tabbouleh",cal:480,desc:"Ahi coated in sesame seeds, seared 60 sec per side. Quinoa tabbouleh: cucumber, parsley, mint, lemon.",prep:"25 min",tags:["protein","fish","fiber"] },
      { meal:"Coconut Lime Shrimp + Black Bean Rice + Grilled Pineapple",cal:510,desc:"Shrimp marinated in coconut milk and lime, grilled or sauteed. Black bean rice with cumin. Grilled pineapple.",prep:"25 min",tags:["protein","fish","fiber"] },
      { meal:"Baked Whole Trout + Roasted Broccolini + Lemon Herb Potatoes",cal:490,desc:"Whole trout stuffed with lemon, herbs, garlic. Roasted at 400F. Broccolini and crispy lemon herb potatoes.",prep:"30 min",tags:["protein","fish","fiber"] },
      { meal:"Miso-Glazed Salmon + Roasted Asparagus + Farro",cal:530,desc:"Salmon broiled with white miso, honey, rice vinegar, deep caramelized glaze. Asparagus with lemon. Farro.",prep:"30 min",tags:["protein","fish","fiber"] },
      { meal:"Stuffed Bell Peppers with Lentils & Feta",cal:480,desc:"Bell peppers filled with green lentils, diced tomatoes, cumin, smoked paprika, crumbled feta.",prep:"40 min",tags:["protein","fiber","veg"] },
    ],
    notes:"Thursday grocery run, you're in the home stretch.",
  },
  { day:"Thursday",  date:"Day 12", theme:"Home Stretch",
    breakfasts:[
      { meal:"Cottage Cheese Peach Shake",cal:280,desc:"Blend: half cup cottage cheese, half cup frozen peaches, 1 tbsp honey, half cup almond milk, half tsp vanilla. ~28g protein.",prep:"3 min",tags:["shake","protein"] },
      { meal:"Hard-Boiled Eggs + Apple",cal:220,desc:"2 hard-boiled eggs + 1 apple. Grab and go.",prep:"0 min",tags:["protein","easy"] },
      { meal:"Overnight Oats",cal:360,desc:"Made last night: oats + milk + chia + PB + berries. Grab from fridge. Zero morning effort.",prep:"0 min",tags:["fiber","easy"] },
    ],
    lunches:[
      { meal:"Smoked Salmon & Cucumber Stack",cal:310,desc:"Cucumber rounds topped with whipped cream cheese, smoked salmon, capers, dill, cracked pepper.",prep:"5 min",tags:["protein","fish","easy"] },
      { meal:"Chickpea Mason Jar Salad",cal:390,desc:"Layer: lemon-tahini dressing, chickpeas, cherry tomatoes, cucumber, roasted red pepper, feta, romaine.",prep:"5 min",tags:["protein","fiber","veg"] },
      { meal:"Tuna & White Bean Lettuce Cups",cal:360,desc:"Canned albacore tuna + white beans + capers + lemon + olive oil + dijon. Scoop into romaine leaves.",prep:"5 min",tags:["protein","fish"] },
    ],
    dinners:[
      { meal:"Moroccan Lentil & Chickpea Stew",cal:490,desc:"Lentils and chickpeas with cumin, coriander, cinnamon, smoked paprika, canned tomatoes, veggie broth. Yogurt swirl, cilantro, warm pita.",prep:"35 min",tags:["protein","fiber","veg"] },
      { meal:"Grilled Swordfish + Mango Salsa + Cilantro Rice",cal:510,desc:"Thick swordfish steak grilled with olive oil and cumin. Fresh mango salsa. Cilantro-lime rice.",prep:"25 min",tags:["protein","fish"] },
      { meal:"Baked Salmon + Roasted Brussels + Farro",cal:520,desc:"Salmon with dijon honey glaze. Brussels sprouts halved, roasted until crispy at 425F. Nutty farro base.",prep:"30 min",tags:["protein","fish","fiber"] },
      { meal:"Miso-Glazed Salmon + Roasted Asparagus + Farro",cal:530,desc:"Salmon broiled with white miso, honey, rice vinegar, deep caramelized glaze. Asparagus with lemon.",prep:"30 min",tags:["protein","fish","fiber"] },
      { meal:"Shrimp Pad Thai with Zucchini Noodles",cal:490,desc:"Zucchini noodles and shrimp in a tamarind-peanut sauce with bean sprouts, green onions, crushed peanuts, lime.",prep:"25 min",tags:["protein","fish"] },
    ],
    notes:"Make extra stew, Friday lunch is done.",
  },
  { day:"Friday",    date:"Day 13", theme:"Strong Finish",
    breakfasts:[
      { meal:"Dark Cherry Recovery Smoothie",cal:330,desc:"Blend: 1 cup frozen dark cherries, 1 scoop chocolate protein, 1 tbsp almond butter, 1 cup oat milk, 1 tsp cocoa.",prep:"3 min",tags:["shake","protein","fiber"] },
      { meal:"Veggie Egg Scramble + Toast",cal:390,desc:"2 eggs scrambled with baby spinach and cherry tomatoes. Whole grain toast with avocado.",prep:"8 min",tags:["protein"] },
      { meal:"Greek Yogurt Parfait",cal:340,desc:"Plain Greek yogurt + frozen berries + chia seeds + granola + honey.",prep:"3 min",tags:["protein","fiber","easy"] },
    ],
    lunches:[
      { meal:"Moroccan Stew Leftover",cal:470,desc:"From thermos or microwaved. Drop in a pita for dipping. Always better on day 2.",prep:"0 min",tags:["protein","fiber","easy"] },
      { meal:"Big Feta & Chickpea Greek Salad",cal:390,desc:"Romaine, kalamata olives, cucumber, cherry tomatoes, red onion, feta, chickpeas. Olive oil + red wine vinegar.",prep:"8 min",tags:["protein","fiber","veg"] },
      { meal:"Edamame & Brown Rice Bowl",cal:420,desc:"Brown rice + edamame + shredded carrots + avocado + tamari and sesame oil. Everything bagel seasoning.",prep:"4 min",tags:["protein","fiber","veg"] },
    ],
    dinners:[
      { meal:"Miso-Glazed Salmon + Roasted Asparagus + Farro",cal:530,desc:"Salmon broiled with white miso, honey, rice vinegar, deep caramelized glaze. Asparagus with lemon. Farro.",prep:"30 min",tags:["protein","fish","fiber"] },
      { meal:"Shrimp Pad Thai with Zucchini Noodles",cal:490,desc:"Zucchini noodles and shrimp in tamarind-peanut sauce with bean sprouts, green onions, crushed peanuts, lime.",prep:"25 min",tags:["protein","fish"] },
      { meal:"Pan-Seared Halibut + Tomato Caper Sauce + Wilted Spinach",cal:470,desc:"Halibut seared golden, finished with bright tomato-caper sauce. Big wilted spinach with garlic.",prep:"25 min",tags:["protein","fish","fiber"] },
      { meal:"Sesame Crusted Tuna + Quinoa Tabbouleh",cal:480,desc:"Ahi coated in sesame seeds, seared 60 sec per side. Quinoa tabbouleh: cucumber, parsley, mint, lemon.",prep:"25 min",tags:["protein","fish","fiber"] },
      { meal:"Baked Whole Trout + Roasted Broccolini + Lemon Herb Potatoes",cal:490,desc:"Whole trout stuffed with lemon, herbs, garlic. Roasted at 400F. Broccolini and crispy lemon herb potatoes.",prep:"30 min",tags:["protein","fish","fiber"] },
    ],
    notes:"Two weeks almost done. Tomorrow is your celebration meal.",
  },
  { day:"Saturday",  date:"Day 14", theme:"You Did It!",
    breakfasts:[
      { meal:"Golden Milk Smoothie Bowl",cal:390,desc:"Thick blend: frozen banana, half tsp turmeric, half tsp cinnamon, 1 scoop vanilla protein, half cup Greek yogurt. Top with granola, mango, honey.",prep:"8 min",tags:["shake","protein","fiber"] },
      { meal:"Full Breakfast Spread",cal:480,desc:"2 eggs any style, avocado toast on thick whole grain bread, side of mixed fruit. Take your time, you earned it.",prep:"15 min",tags:["protein","fiber"] },
      { meal:"Acai Smoothie Bowl",cal:410,desc:"Thick blend: frozen acai packet, frozen banana, protein powder, almond milk. Top with granola, sliced banana, hemp seeds.",prep:"8 min",tags:["shake","protein","fiber"] },
    ],
    lunches:[
      { meal:"Burrata & White Bean Toast",cal:420,desc:"Thick whole-grain toast, smashed white beans with lemon and garlic, fresh burrata, cherry tomatoes, basil, olive oil, flaky salt.",prep:"8 min",tags:["protein","fiber","veg"] },
      { meal:"Big Feta & Chickpea Greek Salad",cal:390,desc:"Romaine, kalamata olives, cucumber, cherry tomatoes, red onion, feta, chickpeas. Olive oil + red wine vinegar.",prep:"8 min",tags:["protein","fiber","veg"] },
      { meal:"Smoked Salmon & Cucumber Stack",cal:310,desc:"Cucumber rounds topped with whipped cream cheese, smoked salmon, capers, dill, cracked pepper.",prep:"5 min",tags:["protein","fish","easy"] },
    ],
    dinners:[
      { meal:"Whole Roasted Sea Bass + Salsa Verde + Baby Potatoes",cal:530,desc:"Sea bass with olive oil and herbs at 425F. Vibrant salsa verde. Rosemary baby potatoes alongside.",prep:"45 min",tags:["protein","fish"] },
      { meal:"Butter Poached Lobster Tail + Truffle Fries + Arugula Salad",cal:590,desc:"Lobster tail poached in herb butter. Oven-baked truffle fries. Light arugula salad with lemon vinaigrette.",prep:"40 min",tags:["protein","fish"] },
      { meal:"Cioppino Seafood Stew + Crusty Bread",cal:520,desc:"Rich tomato broth loaded with shrimp, scallops, cod, clams. Fennel, garlic, white wine. Crusty sourdough.",prep:"45 min",tags:["protein","fish","fiber"] },
      { meal:"Seared Halibut + Brown Butter Capers + Roasted Beets + Farro",cal:530,desc:"Halibut seared in olive oil, finished with brown butter, capers, lemon. Roasted beets and nutty farro.",prep:"35 min",tags:["protein","fish","fiber"] },
      { meal:"Garlic Butter Scallops + Roasted Asparagus + Lemon Risotto",cal:560,desc:"Pan-seared scallops in brown butter and garlic. Asparagus roasted with lemon. Light lemon risotto.",prep:"35 min",tags:["protein","fish"] },
    ],
    notes:"Two full weeks! Review what felt easiest and build Week 3.",
  },
];

// ─── MEDITERRANEAN DATA ───────────────────────────────────────────────────────
const MED_WEEK1 = [
  { day:"Sunday",    date:"Day 1",  theme:"Mediterranean Start",
    breakfasts:[
      { meal:"Greek Yogurt with Honey Walnuts and Figs",cal:310,desc:"Plain Greek yogurt topped with honey, a handful of walnuts, and sliced fresh or dried figs. A true Mediterranean breakfast.",prep:"3 min",tags:["protein","fiber","med"] },
      { meal:"Green Protein Smoothie",cal:310,desc:"Blend: 1 cup spinach, half cucumber, 1 scoop vanilla protein, 1 tbsp tahini, 1 cup almond milk, juice of half lemon. ~32g protein.",prep:"3 min",tags:["shake","protein","fiber","med"] },
      { meal:"Soft-Boiled Eggs + Cucumber Tomato Olive Plate",cal:290,desc:"2 soft-boiled eggs, sliced cucumber, halved cherry tomatoes, a few olives, drizzle of olive oil, pinch of za'atar.",prep:"5 min",tags:["protein","med"] },
    ],
    lunches:[
      { meal:"Classic Hummus Veggie Plate + Pita",cal:380,desc:"Hummus, cucumber slices, cherry tomatoes, kalamata olives, roasted red peppers, whole wheat pita triangles.",prep:"5 min",tags:["protein","fiber","veg","med"] },
      { meal:"Lentil & Roasted Veggie Salad",cal:390,desc:"Green lentils, roasted zucchini and red pepper, cherry tomatoes, fresh parsley, crumbled feta, lemon-olive oil dressing.",prep:"5 min",tags:["protein","fiber","veg","med"] },
      { meal:"Tuna Nicoise Salad",cal:400,desc:"Canned tuna, hard-boiled egg, green beans, cherry tomatoes, kalamata olives, cucumber. Dijon vinaigrette.",prep:"8 min",tags:["protein","fiber","fish","med"] },
    ],
    dinners:[
      { meal:"Baked Sea Bass + Roasted Tomatoes + Herbed Couscous",cal:490,desc:"Sea bass fillets with olive oil, lemon, fresh thyme. Roasted cherry tomatoes. Herbed couscous with parsley, mint, lemon zest.",prep:"30 min",tags:["protein","fish","med"] },
      { meal:"Grilled Branzino + Salsa Verde + Roasted Fennel + Farro",cal:510,desc:"Whole branzino or fillets grilled with olive oil and lemon. Bright salsa verde: parsley, capers, garlic, lemon. Fennel roasted alongside.",prep:"35 min",tags:["protein","fish","fiber","med"] },
      { meal:"Shrimp Saganaki + Crusty Bread + Arugula Salad",cal:470,desc:"Shrimp simmered in spiced tomato sauce with feta melted on top. Scoop with crusty whole grain bread. Arugula salad.",prep:"25 min",tags:["protein","fish","med"] },
      { meal:"Lamb Kofta + Herbed Yogurt + Tabbouleh",cal:530,desc:"Ground lamb kebabs with cumin, coriander, garlic. Grilled or broiled. Cool herbed yogurt sauce. Fresh tabbouleh.",prep:"30 min",tags:["protein","fiber","med"] },
      { meal:"Baked Salmon + Chermoula + Roasted Carrots + Couscous",cal:510,desc:"Salmon topped with chermoula: cilantro, cumin, garlic, lemon, olive oil. Roasted carrots with cumin. Couscous.",prep:"30 min",tags:["protein","fish","fiber","med"] },
    ],
    notes:"Hard-boil 6 eggs tonight for the week.",
  },
  { day:"Monday",    date:"Day 2",  theme:"Fuel Up",
    breakfasts:[
      { meal:"Green Protein Smoothie",cal:310,desc:"Blend: 1 cup spinach, half cucumber, 1 scoop vanilla protein, 1 tbsp tahini, 1 cup almond milk, juice of half lemon.",prep:"3 min",tags:["shake","protein","fiber","med"] },
      { meal:"Ricotta Toast with Honey and Pistachios",cal:350,desc:"Thick whole grain toast spread with part-skim ricotta, drizzle of honey, crushed pistachios, orange zest.",prep:"4 min",tags:["protein","med"] },
      { meal:"Greek Yogurt with Honey Walnuts and Figs",cal:310,desc:"Plain Greek yogurt topped with honey, a handful of walnuts, and sliced fresh or dried figs.",prep:"3 min",tags:["protein","fiber","med"] },
    ],
    lunches:[
      { meal:"Lentil & Roasted Veggie Salad",cal:390,desc:"Green lentils, roasted zucchini and red pepper, cherry tomatoes, fresh parsley, crumbled feta, lemon-olive oil dressing.",prep:"5 min",tags:["protein","fiber","veg","med"] },
      { meal:"Classic Hummus Veggie Plate + Pita",cal:380,desc:"Hummus, cucumber slices, cherry tomatoes, kalamata olives, roasted red peppers, whole wheat pita triangles.",prep:"5 min",tags:["protein","fiber","veg","med"] },
      { meal:"Tuna Nicoise Salad",cal:400,desc:"Canned tuna, hard-boiled egg, green beans, cherry tomatoes, kalamata olives, cucumber. Dijon vinaigrette.",prep:"8 min",tags:["protein","fiber","fish","med"] },
    ],
    dinners:[
      { meal:"Grilled Chicken Souvlaki + Tzatziki + Greek Salad",cal:500,desc:"Chicken marinated in lemon, garlic, olive oil, oregano. Grilled or baked. Served with tzatziki and a classic Greek salad.",prep:"30 min",tags:["protein","med"] },
      { meal:"Lamb Kofta + Herbed Yogurt + Tabbouleh",cal:530,desc:"Ground lamb kebabs with cumin, coriander, garlic. Grilled or broiled. Cool herbed yogurt sauce. Fresh tabbouleh.",prep:"30 min",tags:["protein","fiber","med"] },
      { meal:"Baked Salmon + Chermoula + Roasted Carrots + Couscous",cal:510,desc:"Salmon topped with chermoula. Roasted carrots with cumin. Couscous.",prep:"30 min",tags:["protein","fish","fiber","med"] },
      { meal:"Sea Bass en Papillote + Capers + Cherry Tomatoes + Olives",cal:470,desc:"Sea bass cooked in parchment with olive oil, lemon, capers, cherry tomatoes, olives. Steam-roasted at 400F.",prep:"25 min",tags:["protein","fish","med"] },
      { meal:"Moussaka Lightened + Greek Salad",cal:540,desc:"Layers of roasted eggplant, spiced ground lamb, lightened bechamel made with Greek yogurt. Baked until golden.",prep:"55 min",tags:["protein","fiber","med"] },
    ],
    notes:"Make extra chicken for Tuesday's lunch wrap.",
  },
  { day:"Tuesday",   date:"Day 3",  theme:"Steady",
    breakfasts:[
      { meal:"Soft-Boiled Eggs + Cucumber Tomato Olive Plate",cal:290,desc:"2 soft-boiled eggs, sliced cucumber, halved cherry tomatoes, a few olives, drizzle of olive oil, pinch of za'atar.",prep:"5 min",tags:["protein","med"] },
      { meal:"Banana Tahini Protein Shake",cal:330,desc:"Blend: 1 frozen banana, 1 tbsp tahini, 1 scoop vanilla protein, 1 tsp honey, 1 cup oat milk, pinch of cinnamon.",prep:"3 min",tags:["shake","protein","med"] },
      { meal:"Ricotta Toast with Honey and Pistachios",cal:350,desc:"Thick whole grain toast spread with part-skim ricotta, drizzle of honey, crushed pistachios, orange zest.",prep:"4 min",tags:["protein","med"] },
    ],
    lunches:[
      { meal:"Chicken Souvlaki Wrap Leftover",cal:400,desc:"Monday's chicken in warm whole wheat pita with tzatziki, shredded romaine, sliced tomato, red onion.",prep:"3 min",tags:["protein","med","easy"] },
      { meal:"Lentil & Roasted Veggie Salad",cal:390,desc:"Green lentils, roasted zucchini and red pepper, cherry tomatoes, fresh parsley, crumbled feta, lemon-olive oil dressing.",prep:"5 min",tags:["protein","fiber","veg","med"] },
      { meal:"Classic Hummus Veggie Plate + Pita",cal:380,desc:"Hummus, cucumber slices, cherry tomatoes, kalamata olives, roasted red peppers, whole wheat pita triangles.",prep:"5 min",tags:["protein","fiber","veg","med"] },
    ],
    dinners:[
      { meal:"Shrimp Saganaki + Crusty Bread + Arugula Salad",cal:470,desc:"Shrimp simmered in spiced tomato sauce with feta melted on top. Scoop with crusty whole grain bread. Arugula salad.",prep:"25 min",tags:["protein","fish","med"] },
      { meal:"Seared Tuna Steak + Olive Tapenade + Farro + Roasted Broccolini",cal:500,desc:"Ahi tuna seared 90 sec per side. Olive tapenade spooned on top. Nutty farro and roasted broccolini.",prep:"25 min",tags:["protein","fish","fiber","med"] },
      { meal:"Chicken Shawarma Bowl + Brown Rice + Fattoush Salad",cal:520,desc:"Chicken marinated in shawarma spices: cumin, paprika, turmeric, cinnamon. Over brown rice. Fattoush: tomatoes, cucumbers, crispy pita.",prep:"35 min",tags:["protein","fiber","med"] },
      { meal:"Grilled Chicken Souvlaki + Tzatziki + Greek Salad",cal:500,desc:"Chicken marinated in lemon, garlic, olive oil, oregano. Grilled or baked. Served with tzatziki and Greek salad.",prep:"30 min",tags:["protein","med"] },
      { meal:"Baked Lemon Oregano Chicken + White Beans + Roasted Zucchini",cal:500,desc:"Chicken thighs with lemon, oregano, olive oil. White beans simmered with garlic and rosemary. Zucchini roasted golden.",prep:"35 min",tags:["protein","fiber","med"] },
    ],
    notes:"Cook extra shrimp, add to Wednesday's grain bowl.",
  },
  { day:"Wednesday", date:"Day 4",  theme:"Halfway",
    breakfasts:[
      { meal:"Banana Tahini Protein Shake",cal:330,desc:"Blend: 1 frozen banana, 1 tbsp tahini, 1 scoop vanilla protein, 1 tsp honey, 1 cup oat milk, pinch of cinnamon.",prep:"3 min",tags:["shake","protein","med"] },
      { meal:"Mediterranean Egg Bake",cal:380,desc:"Eggs baked in a skillet with sauteed spinach, cherry tomatoes, crumbled feta, and za'atar. Serve with warm pita.",prep:"20 min",tags:["protein","med"] },
      { meal:"Greek Yogurt with Honey Walnuts and Figs",cal:310,desc:"Plain Greek yogurt topped with honey, a handful of walnuts, and sliced fresh or dried figs.",prep:"3 min",tags:["protein","fiber","med"] },
    ],
    lunches:[
      { meal:"Shrimp & Farro Grain Bowl",cal:410,desc:"Farro base, leftover shrimp, cucumber, cherry tomatoes, kalamata olives, fresh parsley, lemon-olive oil dressing.",prep:"5 min",tags:["protein","fiber","fish","med"] },
      { meal:"Tuna Nicoise Salad",cal:400,desc:"Canned tuna, hard-boiled egg, green beans, cherry tomatoes, kalamata olives, cucumber. Dijon vinaigrette.",prep:"8 min",tags:["protein","fiber","fish","med"] },
      { meal:"Classic Hummus Veggie Plate + Pita",cal:380,desc:"Hummus, cucumber slices, cherry tomatoes, kalamata olives, roasted red peppers, whole wheat pita triangles.",prep:"5 min",tags:["protein","fiber","veg","med"] },
    ],
    dinners:[
      { meal:"Baked Lemon Oregano Chicken + White Beans + Roasted Zucchini",cal:500,desc:"Chicken thighs with lemon, oregano, olive oil. White beans simmered with garlic and rosemary. Zucchini roasted golden.",prep:"35 min",tags:["protein","fiber","med"] },
      { meal:"Sea Bass en Papillote + Capers + Cherry Tomatoes + Olives",cal:470,desc:"Sea bass cooked in parchment with olive oil, lemon, capers, cherry tomatoes, olives. Steam-roasted at 400F.",prep:"25 min",tags:["protein","fish","med"] },
      { meal:"Moussaka Lightened + Greek Salad",cal:540,desc:"Layers of roasted eggplant, spiced ground lamb, lightened bechamel with Greek yogurt. Baked until golden.",prep:"55 min",tags:["protein","fiber","med"] },
      { meal:"Salmon with Olive Tapenade + Roasted Cauliflower + Quinoa",cal:510,desc:"Salmon topped with olive tapenade. Roasted cauliflower with turmeric and cumin. Fluffy quinoa.",prep:"30 min",tags:["protein","fish","fiber","med"] },
      { meal:"Chicken & Lentil Soup + Crusty Bread",cal:460,desc:"Hearty soup with chicken thighs, green lentils, tomatoes, cumin, coriander, lemon. A deeply nourishing bowl.",prep:"40 min",tags:["protein","fiber","med"] },
    ],
    notes:"Thursday grocery run, check your list tonight.",
  },
  { day:"Thursday",  date:"Day 5",  theme:"Second Wind",
    breakfasts:[
      { meal:"Ricotta Toast with Honey and Pistachios",cal:350,desc:"Thick whole grain toast spread with part-skim ricotta, drizzle of honey, crushed pistachios, orange zest.",prep:"4 min",tags:["protein","med"] },
      { meal:"Walnut Date Protein Shake",cal:320,desc:"Blend: 2 Medjool dates pitted, 1 tbsp walnut butter, 1 scoop vanilla protein, 1 cup almond milk, half tsp cinnamon.",prep:"3 min",tags:["shake","protein","med"] },
      { meal:"Soft-Boiled Eggs + Cucumber Tomato Olive Plate",cal:290,desc:"2 soft-boiled eggs, sliced cucumber, halved cherry tomatoes, a few olives, drizzle of olive oil, pinch of za'atar.",prep:"5 min",tags:["protein","med"] },
    ],
    lunches:[
      { meal:"Tuna Nicoise Salad",cal:400,desc:"Canned tuna, hard-boiled egg, green beans, cherry tomatoes, kalamata olives, cucumber. Dijon vinaigrette.",prep:"8 min",tags:["protein","fiber","fish","med"] },
      { meal:"Quinoa Tabbouleh + Falafel",cal:410,desc:"Quinoa tabbouleh: quinoa, parsley, mint, cucumber, cherry tomatoes, lemon, olive oil. Quality store-bought falafel. Tahini drizzle.",prep:"5 min",tags:["protein","fiber","veg","med"] },
      { meal:"Shrimp & Farro Grain Bowl",cal:410,desc:"Farro base, leftover shrimp, cucumber, cherry tomatoes, kalamata olives, fresh parsley, lemon-olive oil dressing.",prep:"5 min",tags:["protein","fiber","fish","med"] },
    ],
    dinners:[
      { meal:"Salmon with Olive Tapenade + Roasted Cauliflower + Quinoa",cal:510,desc:"Salmon topped with olive tapenade. Roasted cauliflower with turmeric and cumin. Fluffy quinoa.",prep:"30 min",tags:["protein","fish","fiber","med"] },
      { meal:"Grilled Octopus + White Bean Salad + Lemon Oil",cal:480,desc:"Octopus grilled until charred and tender. White bean salad with celery, parsley, lemon, olive oil.",prep:"40 min",tags:["protein","fish","fiber","med"] },
      { meal:"Chicken & Lentil Soup + Crusty Bread",cal:460,desc:"Hearty soup with chicken thighs, green lentils, tomatoes, cumin, coriander, lemon.",prep:"40 min",tags:["protein","fiber","med"] },
      { meal:"Baked Lemon Oregano Chicken + White Beans + Roasted Zucchini",cal:500,desc:"Chicken thighs with lemon, oregano, olive oil. White beans simmered with garlic and rosemary.",prep:"35 min",tags:["protein","fiber","med"] },
      { meal:"Grilled Swordfish + Salsa Verde + Baby Potatoes + Greek Salad",cal:530,desc:"Thick swordfish steak grilled or broiled, topped with bright salsa verde. Crispy roasted baby potatoes. Greek salad.",prep:"30 min",tags:["protein","fish","med"] },
    ],
    notes:"Make extra quinoa for Friday.",
  },
  { day:"Friday",    date:"Day 6",  theme:"Strong Finish",
    breakfasts:[
      { meal:"Strawberry Mint Protein Smoothie",cal:320,desc:"Blend: 1 cup frozen strawberries, 4-5 mint leaves, 1 cup Greek yogurt, 1 scoop vanilla protein, half cup almond milk. ~38g protein.",prep:"3 min",tags:["shake","protein","med"] },
      { meal:"Mediterranean Egg Bake",cal:380,desc:"Eggs baked in a skillet with sauteed spinach, cherry tomatoes, crumbled feta, and za'atar. Serve with warm pita.",prep:"20 min",tags:["protein","med"] },
      { meal:"Greek Yogurt with Honey Walnuts and Figs",cal:310,desc:"Plain Greek yogurt topped with honey, a handful of walnuts, and sliced fresh or dried figs.",prep:"3 min",tags:["protein","fiber","med"] },
    ],
    lunches:[
      { meal:"Quinoa Tabbouleh + Falafel",cal:410,desc:"Quinoa tabbouleh: quinoa, parsley, mint, cucumber, cherry tomatoes, lemon, olive oil. Quality falafel. Tahini drizzle.",prep:"5 min",tags:["protein","fiber","veg","med"] },
      { meal:"Lentil & Roasted Veggie Salad",cal:390,desc:"Green lentils, roasted zucchini and red pepper, cherry tomatoes, fresh parsley, crumbled feta, lemon-olive oil dressing.",prep:"5 min",tags:["protein","fiber","veg","med"] },
      { meal:"Classic Hummus Veggie Plate + Pita",cal:380,desc:"Hummus, cucumber slices, cherry tomatoes, kalamata olives, roasted red peppers, whole wheat pita triangles.",prep:"5 min",tags:["protein","fiber","veg","med"] },
    ],
    dinners:[
      { meal:"Whole Baked Branzino + Roasted Root Veggies + Tzatziki",cal:510,desc:"Whole branzino stuffed with lemon and rosemary, roasted at 425F. Root veggies alongside. Tzatziki for dipping.",prep:"35 min",tags:["protein","fish","med"] },
      { meal:"Grilled Swordfish + Salsa Verde + Baby Potatoes + Greek Salad",cal:530,desc:"Thick swordfish steak grilled or broiled, topped with bright salsa verde. Crispy roasted baby potatoes.",prep:"30 min",tags:["protein","fish","med"] },
      { meal:"Pan-Seared Cod + Romesco Sauce + Roasted Asparagus + Farro",cal:490,desc:"Cod seared golden. Romesco sauce: roasted red peppers, almonds, garlic, olive oil. Asparagus. Nutty farro.",prep:"30 min",tags:["protein","fish","fiber","med"] },
      { meal:"Chicken Shawarma Bowl + Brown Rice + Fattoush Salad",cal:520,desc:"Chicken with shawarma spices over brown rice. Fattoush: tomatoes, cucumbers, radishes, crispy pita.",prep:"35 min",tags:["protein","fiber","med"] },
      { meal:"Salmon with Olive Tapenade + Roasted Cauliflower + Quinoa",cal:510,desc:"Salmon topped with olive tapenade. Roasted cauliflower with turmeric and cumin. Fluffy quinoa.",prep:"30 min",tags:["protein","fish","fiber","med"] },
    ],
    notes:"Two weeks almost done, you should feel great.",
  },
  { day:"Saturday",  date:"Day 7",  theme:"Weekend",
    breakfasts:[
      { meal:"Mediterranean Egg Bake",cal:380,desc:"Eggs baked in a skillet with sauteed spinach, cherry tomatoes, crumbled feta, and za'atar. Serve with warm pita.",prep:"20 min",tags:["protein","med"] },
      { meal:"Shakshuka with Feta & Crusty Bread",cal:420,desc:"Eggs poached in a spiced tomato and pepper sauce. Crumble feta on top. Scoop with crusty whole grain bread.",prep:"25 min",tags:["protein","med"] },
      { meal:"Mango Cardamom Smoothie",cal:310,desc:"Blend: 1 cup frozen mango, quarter tsp cardamom, 1 scoop vanilla protein, 1 cup Greek yogurt, half cup almond milk. ~36g protein.",prep:"3 min",tags:["shake","protein","med"] },
    ],
    lunches:[
      { meal:"Big Mezze Plate",cal:430,desc:"Hummus, baba ganoush, stuffed grape leaves, cucumber, tomatoes, olives, pita. Graze, share, enjoy.",prep:"5 min",tags:["protein","fiber","veg","med"] },
      { meal:"Quinoa Tabbouleh + Falafel",cal:410,desc:"Quinoa tabbouleh: quinoa, parsley, mint, cucumber, cherry tomatoes, lemon, olive oil. Quality falafel. Tahini drizzle.",prep:"5 min",tags:["protein","fiber","veg","med"] },
      { meal:"Lentil & Roasted Veggie Salad",cal:390,desc:"Green lentils, roasted zucchini and red pepper, cherry tomatoes, fresh parsley, crumbled feta, lemon-olive oil dressing.",prep:"5 min",tags:["protein","fiber","veg","med"] },
    ],
    dinners:[
      { meal:"Lamb Kofta + Grilled Vegetables + Herbed Yogurt Sauce",cal:540,desc:"Ground lamb kebabs with cumin, coriander, garlic. Grilled zucchini, eggplant, red pepper. Cool herbed yogurt.",prep:"35 min",tags:["protein","med"] },
      { meal:"Paella Saffron Rice + Shrimp + Mussels + Chicken",cal:580,desc:"Classic paella with saffron rice, shrimp, mussels, chicken, peas, roasted red peppers. A Saturday showstopper.",prep:"50 min",tags:["protein","fish","fiber","med"] },
      { meal:"Braised Short Ribs + Gremolata + Polenta",cal:620,desc:"Red wine-braised short ribs, fall-apart tender. Gremolata: parsley, lemon zest, garlic. Creamy polenta base.",prep:"2 hrs",tags:["protein","med"] },
      { meal:"Whole Baked Branzino + Roasted Root Veggies + Tzatziki",cal:510,desc:"Whole branzino stuffed with lemon and rosemary, roasted at 425F. Root veggies alongside. Tzatziki.",prep:"35 min",tags:["protein","fish","med"] },
      { meal:"Grilled Swordfish + Salsa Verde + Baby Potatoes + Greek Salad",cal:530,desc:"Thick swordfish steak grilled or broiled, topped with bright salsa verde. Crispy roasted baby potatoes.",prep:"30 min",tags:["protein","fish","med"] },
    ],
    notes:"Week 2 tomorrow, prep your grocery list tonight.",
  },
];

const MED_WEEK2 = [
  { day:"Sunday",    date:"Day 8",  theme:"Week 2 Begin",
    breakfasts:[
      { meal:"Walnut Date Protein Shake",cal:320,desc:"Blend: 2 Medjool dates pitted, 1 tbsp walnut butter, 1 scoop vanilla protein, 1 cup almond milk, half tsp cinnamon.",prep:"3 min",tags:["shake","protein","med"] },
      { meal:"Fig & Almond Overnight Oats",cal:370,desc:"Made Sunday night: oats + almond milk + chia seeds + almond butter + sliced dried figs on top. Grab from fridge.",prep:"0 min",tags:["fiber","med","easy"] },
      { meal:"Mediterranean Egg Bake",cal:380,desc:"Eggs baked in a skillet with sauteed spinach, cherry tomatoes, crumbled feta, and za'atar. Serve with warm pita.",prep:"20 min",tags:["protein","med"] },
    ],
    lunches:[
      { meal:"White Bean & Tomato Soup batch cook",cal:350,desc:"White beans, canned tomatoes, veggie broth, garlic, rosemary, olive oil. Simmer 20 min. Finish with lemon juice. Eats all week.",prep:"25 min",tags:["protein","fiber","veg","med"] },
      { meal:"Big Mezze Plate",cal:430,desc:"Hummus, baba ganoush, stuffed grape leaves, cucumber, tomatoes, olives, pita. Graze, share, enjoy.",prep:"5 min",tags:["protein","fiber","veg","med"] },
      { meal:"Lentil & Roasted Veggie Salad",cal:390,desc:"Green lentils, roasted zucchini and red pepper, cherry tomatoes, fresh parsley, crumbled feta, lemon-olive oil dressing.",prep:"5 min",tags:["protein","fiber","veg","med"] },
    ],
    dinners:[
      { meal:"Herb-Baked Chicken + Roasted Eggplant + Bulgur Wheat",cal:510,desc:"Chicken thighs with herbes de Provence and lemon. Roasted eggplant with olive oil. Bulgur wheat with parsley and mint.",prep:"40 min",tags:["protein","fiber","med"] },
      { meal:"Baked Whole Trout + Roasted Peppers + Herbed Couscous",cal:490,desc:"Whole trout stuffed with lemon, herbs, garlic. Roasted at 400F. Roasted peppers and herbed couscous.",prep:"30 min",tags:["protein","fish","fiber","med"] },
      { meal:"Chicken Tagine + Preserved Lemon + Olives + Couscous",cal:540,desc:"Chicken slow-braised with preserved lemon, olives, saffron, ginger, coriander. Fluffy couscous to soak it up.",prep:"50 min",tags:["protein","fiber","med"] },
      { meal:"Pan-Seared Salmon + Caponata + Farro",cal:540,desc:"Salmon seared in olive oil, finished with lemon. Caponata: eggplant, tomatoes, olives, capers, red wine vinegar. Nutty farro.",prep:"35 min",tags:["protein","fish","fiber","med"] },
      { meal:"Grilled Tuna + Sicilian Olive Relish + White Beans + Arugula",cal:510,desc:"Ahi tuna grilled to medium rare. Sicilian olive relish: green and black olives, capers, lemon. White beans and arugula.",prep:"25 min",tags:["protein","fish","fiber","med"] },
    ],
    notes:"Hard-boil 6 eggs and prep tomorrow's overnight oats.",
  },
  { day:"Monday",    date:"Day 9",  theme:"Locked In",
    breakfasts:[
      { meal:"Fig & Almond Overnight Oats",cal:370,desc:"Made Sunday night: oats + almond milk + chia seeds + almond butter + sliced dried figs on top. Grab from fridge.",prep:"0 min",tags:["fiber","med","easy"] },
      { meal:"Strawberry Mint Protein Smoothie",cal:320,desc:"Blend: 1 cup frozen strawberries, 4-5 mint leaves, 1 cup Greek yogurt, 1 scoop vanilla protein, half cup almond milk.",prep:"3 min",tags:["shake","protein","med"] },
      { meal:"Hard-Boiled Eggs + Za'atar Labneh + Pita",cal:340,desc:"2 hard-boiled eggs + store-bought labneh drizzled with olive oil and za'atar + warm pita triangles. Authentic and fast.",prep:"3 min",tags:["protein","med"] },
    ],
    lunches:[
      { meal:"White Bean Soup from Sunday",cal:340,desc:"Thermos or microwave. Drizzle of olive oil and fresh parsley on top. Better every day.",prep:"0 min",tags:["protein","fiber","veg","easy"] },
      { meal:"Classic Hummus Veggie Plate + Pita",cal:380,desc:"Hummus, cucumber slices, cherry tomatoes, kalamata olives, roasted red peppers, whole wheat pita triangles.",prep:"5 min",tags:["protein","fiber","veg","med"] },
      { meal:"Tuna Nicoise Salad",cal:400,desc:"Canned tuna, hard-boiled egg, green beans, cherry tomatoes, kalamata olives, cucumber. Dijon vinaigrette.",prep:"8 min",tags:["protein","fiber","fish","med"] },
    ],
    dinners:[
      { meal:"Pan-Seared Salmon + Caponata + Farro",cal:540,desc:"Salmon seared in olive oil, finished with lemon. Caponata: eggplant, tomatoes, olives, capers. Nutty farro.",prep:"35 min",tags:["protein","fish","fiber","med"] },
      { meal:"Grilled Tuna + Sicilian Olive Relish + White Beans",cal:510,desc:"Ahi tuna grilled to medium rare. Sicilian olive relish: olives, capers, lemon. White beans and arugula.",prep:"25 min",tags:["protein","fish","fiber","med"] },
      { meal:"Chicken Marsala + Roasted Fingerlings + Wilted Spinach",cal:530,desc:"Chicken breast in marsala wine and mushroom sauce. Crispy fingerling potatoes. Wilted spinach with garlic.",prep:"30 min",tags:["protein","med"] },
      { meal:"Herb-Baked Chicken + Roasted Eggplant + Bulgur Wheat",cal:510,desc:"Chicken thighs with herbes de Provence and lemon. Roasted eggplant. Bulgur wheat with parsley and mint.",prep:"40 min",tags:["protein","fiber","med"] },
      { meal:"Shrimp & Orzo with Spinach Lemon & Feta",cal:490,desc:"Shrimp cooked with garlic and white wine. Toss with orzo, baby spinach, lemon juice, crumbled feta.",prep:"25 min",tags:["protein","fish","med"] },
    ],
    notes:"Make extra caponata, it gets better overnight.",
  },
  { day:"Tuesday",   date:"Day 10", theme:"Dialed",
    breakfasts:[
      { meal:"Hard-Boiled Eggs + Za'atar Labneh + Pita",cal:340,desc:"2 hard-boiled eggs + labneh drizzled with olive oil and za'atar + warm pita triangles. Authentic and fast.",prep:"3 min",tags:["protein","med"] },
      { meal:"Mango Cardamom Smoothie",cal:310,desc:"Blend: 1 cup frozen mango, quarter tsp cardamom, 1 scoop vanilla protein, 1 cup Greek yogurt, half cup almond milk.",prep:"3 min",tags:["shake","protein","med"] },
      { meal:"Ricotta Toast with Honey and Pistachios",cal:350,desc:"Thick whole grain toast spread with part-skim ricotta, drizzle of honey, crushed pistachios, orange zest.",prep:"4 min",tags:["protein","med"] },
    ],
    lunches:[
      { meal:"Caponata & Farro Bowl Leftover",cal:400,desc:"Monday's leftover farro and caponata over arugula with a squeeze of lemon. Add a hard-boiled egg for extra protein.",prep:"3 min",tags:["protein","fiber","med"] },
      { meal:"White Bean Soup",cal:340,desc:"From thermos or microwaved. Drizzle of olive oil on top.",prep:"0 min",tags:["protein","fiber","easy"] },
      { meal:"Tuna Nicoise Salad",cal:400,desc:"Canned tuna, hard-boiled egg, green beans, cherry tomatoes, kalamata olives, cucumber. Dijon vinaigrette.",prep:"8 min",tags:["protein","fiber","fish","med"] },
    ],
    dinners:[
      { meal:"Shrimp & Orzo with Spinach Lemon & Feta",cal:490,desc:"Shrimp cooked with garlic and white wine. Toss with orzo, baby spinach, lemon juice, crumbled feta.",prep:"25 min",tags:["protein","fish","med"] },
      { meal:"Baked Cod + Tomato & Olive Sauce + Roasted Cauliflower",cal:460,desc:"Cod baked in rich tomato sauce with kalamata olives, capers, garlic, white wine. Roasted cauliflower.",prep:"30 min",tags:["protein","fish","med"] },
      { meal:"Lemon Herb Chicken + White Bean Ragu + Wilted Greens",cal:510,desc:"Seared chicken thighs over white bean ragu with garlic, rosemary, sage. Wilted greens with olive oil.",prep:"35 min",tags:["protein","fiber","med"] },
      { meal:"Pan-Seared Salmon + Caponata + Farro",cal:540,desc:"Salmon seared in olive oil, finished with lemon. Caponata: eggplant, tomatoes, olives, capers. Nutty farro.",prep:"35 min",tags:["protein","fish","fiber","med"] },
      { meal:"Grilled Tuna + Sicilian Olive Relish + White Beans",cal:510,desc:"Ahi tuna grilled to medium rare. Sicilian olive relish. White beans and arugula alongside.",prep:"25 min",tags:["protein","fish","fiber","med"] },
    ],
    notes:"Cook extra orzo for Wednesday's lunch.",
  },
  { day:"Wednesday", date:"Day 11", theme:"Fiber Day",
    breakfasts:[
      { meal:"Mango Cardamom Smoothie",cal:310,desc:"Blend: 1 cup frozen mango, quarter tsp cardamom, 1 scoop vanilla protein, 1 cup Greek yogurt, half cup almond milk.",prep:"3 min",tags:["shake","protein","med"] },
      { meal:"Fig & Almond Overnight Oats",cal:370,desc:"Made last night: oats + almond milk + chia seeds + almond butter + sliced dried figs on top. Grab from fridge.",prep:"0 min",tags:["fiber","med","easy"] },
      { meal:"Soft-Boiled Eggs + Cucumber Tomato Olive Plate",cal:290,desc:"2 soft-boiled eggs, sliced cucumber, halved cherry tomatoes, olives, drizzle of olive oil, pinch of za'atar.",prep:"5 min",tags:["protein","med"] },
    ],
    lunches:[
      { meal:"White Bean Soup Last of Batch",cal:340,desc:"Finish the Sunday pot. Add a drizzle of good olive oil and crusty bread for dipping.",prep:"0 min",tags:["protein","fiber","veg","easy"] },
      { meal:"Caponata & Farro Bowl",cal:400,desc:"Leftover farro and caponata over arugula with lemon. Add a hard-boiled egg.",prep:"3 min",tags:["protein","fiber","med"] },
      { meal:"Quinoa Tabbouleh + Falafel",cal:410,desc:"Quinoa tabbouleh: quinoa, parsley, mint, cucumber, cherry tomatoes, lemon, olive oil. Quality falafel. Tahini drizzle.",prep:"5 min",tags:["protein","fiber","veg","med"] },
    ],
    dinners:[
      { meal:"Baked Cod with Chermoula + Roasted Carrots + Couscous",cal:480,desc:"Cod topped with chermoula: cilantro, cumin, garlic, lemon, olive oil. Roasted carrots. Couscous with parsley.",prep:"30 min",tags:["protein","fish","fiber","med"] },
      { meal:"Salmon en Papillote + Asparagus + Herbed Quinoa",cal:500,desc:"Salmon cooked in parchment with lemon, dill, capers, white wine. Asparagus alongside. Herbed quinoa.",prep:"25 min",tags:["protein","fish","fiber","med"] },
      { meal:"Stuffed Eggplant with Lamb & Pine Nuts + Greek Salad",cal:530,desc:"Eggplant halves roasted, filled with spiced ground lamb, pine nuts, tomatoes. Baked until golden. Greek salad.",prep:"45 min",tags:["protein","fiber","med"] },
      { meal:"Shrimp & Orzo with Spinach Lemon & Feta",cal:490,desc:"Shrimp cooked with garlic and white wine. Toss with orzo, baby spinach, lemon juice, crumbled feta.",prep:"25 min",tags:["protein","fish","med"] },
      { meal:"Lemon Herb Chicken + White Bean Ragu + Wilted Greens",cal:510,desc:"Seared chicken thighs over white bean ragu with garlic, rosemary, sage. Wilted greens with olive oil.",prep:"35 min",tags:["protein","fiber","med"] },
    ],
    notes:"Thursday grocery run, almost done!",
  },
  { day:"Thursday",  date:"Day 12", theme:"Home Stretch",
    breakfasts:[
      { meal:"Cottage Cheese + Roasted Peppers + Olive Oil Toast",cal:330,desc:"Whole grain toast spread with cottage cheese, topped with jarred roasted red peppers, olive oil, fresh basil.",prep:"4 min",tags:["protein","med"] },
      { meal:"Dark Cherry Protein Smoothie",cal:320,desc:"Blend: 1 cup frozen dark cherries, 1 scoop chocolate protein, 1 tbsp tahini, 1 cup oat milk. Rich and anti-inflammatory.",prep:"3 min",tags:["shake","protein","med"] },
      { meal:"Walnut Date Protein Shake",cal:320,desc:"Blend: 2 Medjool dates pitted, 1 tbsp walnut butter, 1 scoop vanilla protein, 1 cup almond milk, half tsp cinnamon.",prep:"3 min",tags:["shake","protein","med"] },
    ],
    lunches:[
      { meal:"Falafel & Tabbouleh Plate",cal:420,desc:"Quality falafel, classic tabbouleh: parsley, bulgur, tomatoes, mint, lemon, hummus, pita. Fast Mediterranean feast.",prep:"5 min",tags:["protein","fiber","veg","med"] },
      { meal:"Big Mezze Plate",cal:430,desc:"Hummus, baba ganoush, stuffed grape leaves, cucumber, tomatoes, olives, pita.",prep:"5 min",tags:["protein","fiber","veg","med"] },
      { meal:"Lentil & Roasted Veggie Salad",cal:390,desc:"Green lentils, roasted zucchini and red pepper, cherry tomatoes, fresh parsley, crumbled feta, lemon-olive oil dressing.",prep:"5 min",tags:["protein","fiber","veg","med"] },
    ],
    dinners:[
      { meal:"Lemon Rosemary Chicken Thighs + White Bean Ragu + Wilted Greens",cal:510,desc:"Chicken thighs with lemon and rosemary. White bean ragu: beans, garlic, broth, sage. Wilted greens.",prep:"40 min",tags:["protein","fiber","med"] },
      { meal:"Grilled Shrimp Skewers + Roasted Red Pepper Sauce + Couscous",cal:470,desc:"Shrimp marinated in lemon, garlic, herbs. Grilled on skewers. Roasted red pepper sauce. Fluffy couscous.",prep:"25 min",tags:["protein","fish","med"] },
      { meal:"Braised Lamb Shanks + Gremolata + White Beans + Crusty Bread",cal:590,desc:"Lamb shanks braised in red wine, tomatoes, rosemary until fall-apart tender. Gremolata. White beans and bread.",prep:"2 hrs",tags:["protein","fiber","med"] },
      { meal:"Baked Cod with Chermoula + Roasted Carrots + Couscous",cal:480,desc:"Cod topped with chermoula. Roasted carrots with cumin. Couscous with parsley and lemon.",prep:"30 min",tags:["protein","fish","fiber","med"] },
      { meal:"Salmon en Papillote + Asparagus + Herbed Quinoa",cal:500,desc:"Salmon cooked in parchment with lemon, dill, capers. Asparagus alongside. Herbed quinoa.",prep:"25 min",tags:["protein","fish","fiber","med"] },
    ],
    notes:"Make extra chicken and beans for Friday's lunch.",
  },
  { day:"Friday",    date:"Day 13", theme:"Strong Finish",
    breakfasts:[
      { meal:"Dark Cherry Protein Smoothie",cal:320,desc:"Blend: 1 cup frozen dark cherries, 1 scoop chocolate protein, 1 tbsp tahini, 1 cup oat milk. Rich and anti-inflammatory.",prep:"3 min",tags:["shake","protein","med"] },
      { meal:"Mediterranean Egg Bake",cal:380,desc:"Eggs baked in a skillet with sauteed spinach, cherry tomatoes, crumbled feta, za'atar. Serve with warm pita.",prep:"20 min",tags:["protein","med"] },
      { meal:"Fig & Almond Overnight Oats",cal:370,desc:"Made last night: oats + almond milk + chia seeds + almond butter + sliced dried figs on top.",prep:"0 min",tags:["fiber","med","easy"] },
    ],
    lunches:[
      { meal:"Chicken & White Bean Salad Leftover",cal:390,desc:"Thursday's chicken shredded over arugula with white beans, cherry tomatoes, olives, lemon-olive oil dressing.",prep:"4 min",tags:["protein","fiber","med","easy"] },
      { meal:"Falafel & Tabbouleh Plate",cal:420,desc:"Quality falafel, classic tabbouleh: parsley, bulgur, tomatoes, mint, lemon, hummus, pita.",prep:"5 min",tags:["protein","fiber","veg","med"] },
      { meal:"Tuna Nicoise Salad",cal:400,desc:"Canned tuna, hard-boiled egg, green beans, cherry tomatoes, kalamata olives, cucumber. Dijon vinaigrette.",prep:"8 min",tags:["protein","fiber","fish","med"] },
    ],
    dinners:[
      { meal:"Grilled Swordfish + Salsa Verde + Roasted Potatoes + Greek Salad",cal:530,desc:"Thick swordfish steak topped with bright salsa verde. Crispy roasted baby potatoes. Greek salad.",prep:"30 min",tags:["protein","fish","med"] },
      { meal:"Sea Bass + Pistachio Crust + Roasted Fennel + Lemon Quinoa",cal:510,desc:"Sea bass coated in crushed pistachios and herbs, baked at 400F. Roasted fennel and lemon quinoa.",prep:"30 min",tags:["protein","fish","fiber","med"] },
      { meal:"Oven-Baked Chicken Kofta + Tzatziki + Warm Pita + Fattoush",cal:520,desc:"Ground chicken kofta baked at 400F with Mediterranean spices. Creamy tzatziki, warm pita, bright fattoush.",prep:"30 min",tags:["protein","fiber","med"] },
      { meal:"Salmon en Papillote + Asparagus + Herbed Quinoa",cal:500,desc:"Salmon cooked in parchment with lemon, dill, capers. Asparagus alongside. Herbed quinoa.",prep:"25 min",tags:["protein","fish","fiber","med"] },
      { meal:"Lemon Herb Chicken + White Bean Ragu + Wilted Greens",cal:510,desc:"Seared chicken thighs over white bean ragu with garlic, rosemary, sage. Wilted greens.",prep:"35 min",tags:["protein","fiber","med"] },
    ],
    notes:"One day left, your celebration dinner tomorrow.",
  },
  { day:"Saturday",  date:"Day 14", theme:"Celebration!",
    breakfasts:[
      { meal:"Shakshuka with Feta & Crusty Bread",cal:420,desc:"Eggs poached in a spiced tomato and pepper sauce. Crumble feta on top. Scoop with crusty whole grain bread.",prep:"25 min",tags:["protein","med"] },
      { meal:"Mediterranean Egg Bake",cal:380,desc:"Eggs baked in a skillet with sauteed spinach, cherry tomatoes, crumbled feta, za'atar. Serve with warm pita.",prep:"20 min",tags:["protein","med"] },
      { meal:"Walnut Date Protein Shake",cal:320,desc:"Blend: 2 Medjool dates, 1 tbsp walnut butter, 1 scoop vanilla protein, 1 cup almond milk, half tsp cinnamon.",prep:"3 min",tags:["shake","protein","med"] },
    ],
    lunches:[
      { meal:"Grand Mezze Spread",cal:460,desc:"Hummus, baba ganoush, labneh, stuffed grape leaves, pita, crudites, olives. The full Mediterranean experience.",prep:"10 min",tags:["protein","fiber","veg","med"] },
      { meal:"Big Mezze Plate",cal:430,desc:"Hummus, baba ganoush, stuffed grape leaves, cucumber, tomatoes, olives, pita.",prep:"5 min",tags:["protein","fiber","veg","med"] },
      { meal:"Falafel & Tabbouleh Plate",cal:420,desc:"Quality falafel, classic tabbouleh: parsley, bulgur, tomatoes, mint, lemon, hummus, pita.",prep:"5 min",tags:["protein","fiber","veg","med"] },
    ],
    dinners:[
      { meal:"Slow-Roasted Leg of Lamb + Roasted Root Vegetables + Tzatziki",cal:620,desc:"Leg of lamb marinated in garlic, lemon, rosemary, olive oil. Slow-roasted until fall-apart tender. Root veg. Big bowl of tzatziki.",prep:"2 hrs",tags:["protein","med"] },
      { meal:"Whole Roasted Sea Bass + Lemon Herb Oil + Grilled Vegetables + Farro",cal:560,desc:"Whole sea bass roasted with olive oil, lemon, fresh herbs. Grilled seasonal vegetables. Nutty farro.",prep:"40 min",tags:["protein","fish","fiber","med"] },
      { meal:"Lobster & Shrimp Paella + Saffron + Roasted Peppers",cal:600,desc:"Grand celebration paella with lobster, shrimp, saffron rice, roasted red peppers, and peas.",prep:"55 min",tags:["protein","fish","fiber","med"] },
      { meal:"Grilled Swordfish + Salsa Verde + Roasted Potatoes + Greek Salad",cal:530,desc:"Thick swordfish steak topped with bright salsa verde. Crispy roasted baby potatoes. Greek salad.",prep:"30 min",tags:["protein","fish","med"] },
      { meal:"Braised Lamb Shanks + Gremolata + White Beans + Crusty Bread",cal:590,desc:"Lamb shanks braised in red wine, tomatoes, rosemary until fall-apart tender. Gremolata. White beans and bread.",prep:"2 hrs",tags:["protein","fiber","med"] },
    ],
    notes:"14 days of Mediterranean done. You look and feel different.",
  },
];

// ─── BUDGET DATA ──────────────────────────────────────────────────────────────
const BUDGET_WEEK1 = [
  { day:"Sunday",    date:"Day 1",  theme:"Fresh Start",
    breakfasts:[
      { meal:"Scrambled Eggs on Toast",cal:310,desc:"2 eggs scrambled with butter, salt, and pepper. Served on whole grain toast. Add hot sauce if you like. Classic, filling, cheap.",prep:"5 min",tags:["protein","easy"] },
      { meal:"Oatmeal with Banana & Peanut Butter",cal:340,desc:"Half cup rolled oats cooked in water or milk. Top with half a sliced banana and 1 tbsp peanut butter. Stir it in. About 40 cents.",prep:"5 min",tags:["fiber","easy"] },
      { meal:"Yogurt + Granola + Banana",cal:300,desc:"Plain Greek yogurt + a small handful of granola + sliced banana. Fast and high protein.",prep:"2 min",tags:["protein","easy"] },
    ],
    lunches:[
      { meal:"Lentil & Vegetable Soup batch cook",cal:320,desc:"Big pot: green lentils, diced carrots, celery, onion, canned tomatoes, chicken broth, cumin, garlic. Simmer 25 min. Eats all week.",prep:"30 min",tags:["protein","fiber"] },
      { meal:"Tuna Salad Sandwich",cal:370,desc:"Canned tuna + a little mayo, dijon, celery, lemon. On whole grain bread with romaine. One of the best budget proteins.",prep:"5 min",tags:["protein","fish","easy"] },
      { meal:"Peanut Butter & Banana Wrap",cal:350,desc:"Whole wheat tortilla spread with peanut butter, sliced banana, drizzle of honey. Roll it up. Keeps you going for hours.",prep:"2 min",tags:["fiber","easy"] },
    ],
    dinners:[
      { meal:"Baked Chicken Thighs + Roasted Potatoes + Green Beans",cal:490,desc:"Bone-in chicken thighs rubbed with garlic powder, paprika, salt. Roasted at 400F with baby potatoes and green beans. One pan, zero waste.",prep:"40 min",tags:["protein","fiber","meat"] },
      { meal:"Ground Turkey Taco Bowls + Brown Rice + Black Beans",cal:510,desc:"Seasoned ground turkey over brown rice with canned black beans, salsa, shredded cheddar, Greek yogurt. Budget taco night.",prep:"25 min",tags:["protein","fiber","meat"] },
      { meal:"Pasta + Turkey Meat Sauce + Parmesan",cal:530,desc:"Whole wheat pasta with a simple ground turkey and jarred marinara meat sauce. Parmesan on top. Under $3 a serving.",prep:"25 min",tags:["protein","meat"] },
      { meal:"Black Bean Quesadillas + Salsa + Greek Yogurt",cal:430,desc:"Whole wheat tortillas filled with canned black beans, shredded cheddar, cumin. Pan-fried crispy. Salsa and Greek yogurt for dipping.",prep:"10 min",tags:["protein","fiber","veg","easy"] },
      { meal:"Chicken Stir-Fry + Frozen Veggies + Brown Rice",cal:460,desc:"Chicken thighs sliced thin, stir-fried with frozen mixed veggies in soy sauce, garlic, drizzle of sesame oil. Over brown rice.",prep:"20 min",tags:["protein","fiber","meat"] },
    ],
    notes:"Cook a big pot of brown rice tonight, use it all week.",
  },
  { day:"Monday",    date:"Day 2",  theme:"Simple & Strong",
    breakfasts:[
      { meal:"Oatmeal with Banana & Peanut Butter",cal:340,desc:"Half cup rolled oats cooked with water. Stir in 1 tbsp peanut butter and a drizzle of honey. Filling and costs about 40 cents.",prep:"5 min",tags:["fiber","easy"] },
      { meal:"Hard-Boiled Eggs + Apple",cal:220,desc:"2 hard-boiled eggs + 1 apple. One of the cheapest high-protein breakfasts possible.",prep:"0 min",tags:["protein","easy"] },
      { meal:"Peanut Butter Toast + Banana",cal:320,desc:"2 slices whole grain toast spread with peanut butter. 1 banana on the side. Nutritious and costs about 50 cents.",prep:"3 min",tags:["fiber","easy"] },
    ],
    lunches:[
      { meal:"Lentil Soup Leftover",cal:320,desc:"Sunday's soup straight from the fridge in a thermos. Grab a slice of whole grain bread. Done.",prep:"0 min",tags:["protein","fiber","easy"] },
      { meal:"Tuna Salad on Crackers + Carrot Sticks",cal:310,desc:"Canned tuna with a little mayo and mustard. Spread on whole grain crackers. Carrot sticks on the side. Under $2.",prep:"4 min",tags:["protein","fish","easy"] },
      { meal:"Peanut Butter & Banana Wrap",cal:350,desc:"Whole wheat tortilla spread with peanut butter, sliced banana, drizzle of honey. Roll it up.",prep:"2 min",tags:["fiber","easy"] },
    ],
    dinners:[
      { meal:"Chicken Stir-Fry + Frozen Veggies + Brown Rice",cal:460,desc:"Chicken thighs sliced thin, stir-fried with frozen mixed veggies in soy sauce, garlic, sesame oil. Over rice.",prep:"20 min",tags:["protein","fiber","meat"] },
      { meal:"Black Bean Quesadillas + Salsa + Greek Yogurt",cal:430,desc:"Whole wheat tortillas filled with canned black beans, shredded cheddar, cumin. Pan-fried crispy. Salsa and Greek yogurt.",prep:"10 min",tags:["protein","fiber","veg","easy"] },
      { meal:"Baked Chicken Drumsticks + Mashed Potatoes + Peas",cal:500,desc:"Drumsticks seasoned with garlic, paprika, salt, baked at 400F for 35 min. Simple mashed potatoes. Canned or frozen peas.",prep:"40 min",tags:["protein","meat"] },
      { meal:"Egg Fried Rice + Frozen Peas + Soy Sauce",cal:420,desc:"Day-old brown rice stir-fried with 2 scrambled eggs, frozen peas, soy sauce, and garlic. A classic budget meal.",prep:"10 min",tags:["protein","fiber","easy"] },
      { meal:"Turkey & Sweet Potato Skillet",cal:470,desc:"Ground turkey browned with diced sweet potato, black beans, cumin, chili powder, garlic. One skillet, done in 20 min.",prep:"20 min",tags:["protein","fiber","meat"] },
    ],
    notes:"Hard boil 6 eggs tonight for the week.",
  },
  { day:"Tuesday",   date:"Day 3",  theme:"Midweek Value",
    breakfasts:[
      { meal:"Hard-Boiled Eggs + Apple",cal:220,desc:"2 hard-boiled eggs from last night + 1 apple. Eat on the go. One of the cheapest high-protein breakfasts possible.",prep:"0 min",tags:["protein","easy"] },
      { meal:"Scrambled Eggs on Toast",cal:310,desc:"2 eggs scrambled with butter, salt, and pepper. Served on whole grain toast.",prep:"5 min",tags:["protein","easy"] },
      { meal:"Yogurt + Granola + Banana",cal:300,desc:"Plain Greek yogurt + a small handful of granola + sliced banana.",prep:"2 min",tags:["protein","easy"] },
    ],
    lunches:[
      { meal:"Tuna Salad Sandwich",cal:370,desc:"Canned tuna mixed with mayo, dijon, celery, lemon. On whole grain bread with romaine.",prep:"5 min",tags:["protein","fish","easy"] },
      { meal:"Lentil Soup Leftover",cal:320,desc:"Sunday's soup in a thermos. Still delicious. Grab some crackers.",prep:"0 min",tags:["protein","fiber","easy"] },
      { meal:"Peanut Butter & Banana Wrap",cal:350,desc:"Whole wheat tortilla spread with peanut butter, sliced banana, drizzle of honey. Roll it up.",prep:"2 min",tags:["fiber","easy"] },
    ],
    dinners:[
      { meal:"Turkey & Sweet Potato Skillet",cal:470,desc:"Ground turkey browned with diced sweet potato, black beans, cumin, chili powder, garlic. One skillet, 20 min.",prep:"20 min",tags:["protein","fiber","meat"] },
      { meal:"Egg Fried Rice + Frozen Peas + Soy Sauce",cal:420,desc:"Day-old brown rice stir-fried with 2 scrambled eggs, frozen peas, soy sauce, and garlic.",prep:"10 min",tags:["protein","fiber","easy"] },
      { meal:"Baked Chicken Thighs + Roasted Carrots + Brown Rice",cal:480,desc:"More chicken thighs. Carrots roasted with olive oil and honey. Brown rice from batch.",prep:"35 min",tags:["protein","fiber","meat"] },
      { meal:"Black Bean Soup + Corn Tortillas",cal:390,desc:"Canned black beans simmered with onion, garlic, cumin, chicken broth, lime. Blend half for thick soup. Corn tortillas.",prep:"20 min",tags:["protein","fiber","veg"] },
      { meal:"Pasta + Turkey Meat Sauce + Parmesan",cal:530,desc:"Whole wheat pasta with simple ground turkey and jarred marinara. Parmesan on top. Under $3 a serving.",prep:"25 min",tags:["protein","meat"] },
    ],
    notes:"Cook extra rice or pasta tonight if running low.",
  },
  { day:"Wednesday", date:"Day 4",  theme:"Halfway There",
    breakfasts:[
      { meal:"Peanut Butter Toast + Banana",cal:320,desc:"2 slices whole grain toast spread with peanut butter. 1 banana on the side. Nutritious and cheap.",prep:"3 min",tags:["fiber","easy"] },
      { meal:"Oatmeal with Banana & Peanut Butter",cal:340,desc:"Half cup rolled oats cooked with water. Stir in 1 tbsp peanut butter, sliced banana. Stir it in.",prep:"5 min",tags:["fiber","easy"] },
      { meal:"Hard-Boiled Eggs + Apple",cal:220,desc:"2 hard-boiled eggs + 1 apple. Grab and go.",prep:"0 min",tags:["protein","easy"] },
    ],
    lunches:[
      { meal:"Lentil Soup Last of Batch",cal:320,desc:"Finish the Sunday pot. Squeeze in a little lemon. Whole grain crackers on the side.",prep:"0 min",tags:["protein","fiber","easy"] },
      { meal:"Tuna Salad on Crackers + Carrot Sticks",cal:310,desc:"Canned tuna with mayo and mustard. Spread on whole grain crackers. Carrot sticks on the side.",prep:"4 min",tags:["protein","fish","easy"] },
      { meal:"Grilled Cheese + Tomato Soup",cal:450,desc:"Two slices whole grain bread with cheddar, grilled in butter until golden. Canned tomato soup on the side.",prep:"10 min",tags:["easy"] },
    ],
    dinners:[
      { meal:"Spaghetti + Meat Sauce + Garlic Bread",cal:540,desc:"Whole wheat spaghetti with ground turkey tomato sauce. Garlic bread from a sliced baguette with butter and garlic powder.",prep:"25 min",tags:["protein","meat"] },
      { meal:"Black Bean Soup + Corn Tortillas",cal:390,desc:"Canned black beans simmered with onion, garlic, cumin, chicken broth, lime. Corn tortillas for dipping.",prep:"20 min",tags:["protein","fiber","veg"] },
      { meal:"Chicken & Rice Casserole",cal:510,desc:"Chicken thighs, brown rice, chicken broth, onion, garlic, frozen peas all baked together at 375F for 45 min.",prep:"50 min",tags:["protein","fiber","meat"] },
      { meal:"Turkey & Sweet Potato Skillet",cal:470,desc:"Ground turkey browned with diced sweet potato, black beans, cumin, chili powder, garlic.",prep:"20 min",tags:["protein","fiber","meat"] },
      { meal:"Egg Fried Rice + Frozen Peas + Soy Sauce",cal:420,desc:"Day-old brown rice stir-fried with 2 scrambled eggs, frozen peas, soy sauce, and garlic.",prep:"10 min",tags:["protein","fiber","easy"] },
    ],
    notes:"Thursday grocery run, check your list tonight.",
  },
  { day:"Thursday",  date:"Day 5",  theme:"Second Half",
    breakfasts:[
      { meal:"Yogurt + Granola + Banana",cal:300,desc:"Plain Greek yogurt (buy the big tub) + a small handful of granola + sliced banana. Fast and high protein.",prep:"2 min",tags:["protein","easy"] },
      { meal:"Scrambled Eggs on Toast",cal:310,desc:"2 eggs scrambled with butter, salt, and pepper. Served on whole grain toast.",prep:"5 min",tags:["protein","easy"] },
      { meal:"Peanut Butter Toast + Banana",cal:320,desc:"2 slices whole grain toast spread with peanut butter. 1 banana on the side.",prep:"3 min",tags:["fiber","easy"] },
    ],
    lunches:[
      { meal:"Peanut Butter & Banana Wrap",cal:350,desc:"Whole wheat tortilla spread with peanut butter, sliced banana, drizzle of honey. Roll it up.",prep:"2 min",tags:["fiber","easy"] },
      { meal:"Tuna Salad Sandwich",cal:370,desc:"Canned tuna + mayo, dijon, celery, lemon. On whole grain bread with romaine.",prep:"5 min",tags:["protein","fish","easy"] },
      { meal:"Grilled Cheese + Tomato Soup",cal:450,desc:"Two slices whole grain bread with cheddar, grilled in butter. Canned tomato soup on the side.",prep:"10 min",tags:["easy"] },
    ],
    dinners:[
      { meal:"Chicken Thigh Stew + Potatoes + Carrots",cal:490,desc:"Chicken thighs simmered with diced potatoes, carrots, onion, garlic, chicken broth. Season with thyme and black pepper.",prep:"40 min",tags:["protein","fiber","meat"] },
      { meal:"Tuna Noodle Casserole",cal:460,desc:"Egg noodles, canned tuna, frozen peas, cream of mushroom soup, cheddar. Baked at 375F for 25 min.",prep:"35 min",tags:["protein","fish"] },
      { meal:"Ground Turkey Chili + Cornbread",cal:530,desc:"Hearty chili with ground turkey, canned kidney beans, diced tomatoes, cumin, chili powder. Boxed cornbread on the side.",prep:"35 min",tags:["protein","fiber","meat"] },
      { meal:"Baked Chicken Drumsticks + Mashed Potatoes + Peas",cal:500,desc:"Drumsticks baked at 400F for 35 min. Simple mashed potatoes with butter. Canned or frozen peas.",prep:"40 min",tags:["protein","meat"] },
      { meal:"Bean & Cheese Burritos + Salsa",cal:480,desc:"Whole wheat tortillas filled with refried beans, shredded cheddar, and rice. Microwave until melted. Jarred salsa on the side.",prep:"8 min",tags:["protein","fiber","veg","easy"] },
    ],
    notes:"Batch cook extra chicken tonight if you have time.",
  },
  { day:"Friday",    date:"Day 6",  theme:"End of Week",
    breakfasts:[
      { meal:"Scrambled Eggs + Toast + Orange",cal:320,desc:"3 scrambled eggs with salt and pepper on whole grain toast. An orange on the side. Vitamin C, protein, fiber, budget win.",prep:"7 min",tags:["protein","easy"] },
      { meal:"Oatmeal with Banana & Peanut Butter",cal:340,desc:"Half cup rolled oats cooked with water. Stir in 1 tbsp peanut butter, sliced banana.",prep:"5 min",tags:["fiber","easy"] },
      { meal:"Hard-Boiled Eggs + Apple",cal:220,desc:"2 hard-boiled eggs + 1 apple. Grab and go.",prep:"0 min",tags:["protein","easy"] },
    ],
    lunches:[
      { meal:"Canned Tuna Over Crackers + Apple",cal:300,desc:"Canned tuna with a little hot sauce or mustard, eaten over whole grain crackers. An apple on the side. Fast, under $2.",prep:"3 min",tags:["protein","fish","easy"] },
      { meal:"Peanut Butter & Banana Wrap",cal:350,desc:"Whole wheat tortilla spread with peanut butter, sliced banana, drizzle of honey.",prep:"2 min",tags:["fiber","easy"] },
      { meal:"Grilled Cheese + Tomato Soup",cal:450,desc:"Two slices whole grain bread with cheddar, grilled in butter. Canned tomato soup on the side.",prep:"10 min",tags:["easy"] },
    ],
    dinners:[
      { meal:"Baked Chicken Thighs + Garlic Mashed Potatoes + Corn",cal:510,desc:"Juicy baked chicken thighs with garlic mashed potato and canned or frozen corn. Full dinner for about $2.50 per person.",prep:"40 min",tags:["protein","meat"] },
      { meal:"Bean & Cheese Burritos + Salsa",cal:480,desc:"Whole wheat tortillas filled with refried beans, shredded cheddar, rice. Microwave until melted. Jarred salsa.",prep:"8 min",tags:["protein","fiber","veg","easy"] },
      { meal:"Turkey Burgers + Oven Fries + Coleslaw",cal:520,desc:"Lean ground turkey patties seasoned with garlic and Worcestershire. Oven-baked fries from russet potatoes. Simple coleslaw.",prep:"35 min",tags:["protein","meat"] },
      { meal:"Ground Turkey Chili + Cornbread",cal:530,desc:"Hearty chili with ground turkey, kidney beans, diced tomatoes, cumin, chili powder. Boxed cornbread on the side.",prep:"35 min",tags:["protein","fiber","meat"] },
      { meal:"Chicken Thigh Stew + Potatoes + Carrots",cal:490,desc:"Chicken thighs simmered with diced potatoes, carrots, onion, garlic, chicken broth, thyme and black pepper.",prep:"40 min",tags:["protein","fiber","meat"] },
    ],
    notes:"Weekend, take a breath and plan next week.",
  },
  { day:"Saturday",  date:"Day 7",  theme:"Weekend Treat",
    breakfasts:[
      { meal:"Pancakes + Eggs + Maple Syrup",cal:420,desc:"Boxed pancake mix made with egg and milk, top with maple syrup. 2 fried eggs on the side. A real Saturday morning for under $2.",prep:"15 min",tags:["protein","easy"] },
      { meal:"Scrambled Eggs + Toast + Orange",cal:320,desc:"3 scrambled eggs on whole grain toast. An orange on the side.",prep:"7 min",tags:["protein","easy"] },
      { meal:"Yogurt + Granola + Banana",cal:300,desc:"Plain Greek yogurt + small handful of granola + sliced banana.",prep:"2 min",tags:["protein","easy"] },
    ],
    lunches:[
      { meal:"Grilled Cheese + Tomato Soup",cal:450,desc:"Two slices whole grain bread with cheddar, grilled in butter. Canned tomato soup on the side. The ultimate budget comfort lunch.",prep:"10 min",tags:["easy"] },
      { meal:"Tuna Salad Sandwich",cal:370,desc:"Canned tuna with mayo, dijon, celery, lemon. On whole grain bread with romaine.",prep:"5 min",tags:["protein","fish","easy"] },
      { meal:"Bean & Cheese Burritos + Salsa",cal:480,desc:"Whole wheat tortillas filled with refried beans, shredded cheddar, rice. Microwave until melted. Salsa on the side.",prep:"8 min",tags:["protein","fiber","veg","easy"] },
    ],
    dinners:[
      { meal:"Slow Cooker Chicken + Rice + Veggies",cal:490,desc:"Chicken thighs, chicken broth, garlic, onion, frozen vegetables all cooked together in a slow cooker on low for 6 hours.",prep:"10 min active",tags:["protein","fiber","meat"] },
      { meal:"Homemade Pizza + Salad",cal:520,desc:"Store-bought pizza dough or English muffins. Jarred marinara, shredded mozzarella, whatever toppings you have. Bake at 425F.",prep:"20 min",tags:["easy"] },
      { meal:"Chicken & Vegetable Soup + Crusty Bread",cal:380,desc:"Simple chicken soup: leftover chicken or thighs, carrots, celery, onion, noodles, chicken broth. Simmer 30 min.",prep:"35 min",tags:["protein","fiber","meat"] },
      { meal:"Ground Turkey Taco Bowls + Brown Rice + Black Beans",cal:510,desc:"Seasoned ground turkey over brown rice with canned black beans, salsa, shredded cheddar, Greek yogurt.",prep:"25 min",tags:["protein","fiber","meat"] },
      { meal:"Turkey Burgers + Oven Fries + Coleslaw",cal:520,desc:"Lean ground turkey patties with garlic and Worcestershire. Oven-baked fries. Simple coleslaw.",prep:"35 min",tags:["protein","meat"] },
    ],
    notes:"Week 2 tomorrow, check your pantry before shopping.",
  },
];

const BUDGET_WEEK2 = [
  { day:"Sunday",    date:"Day 8",  theme:"Week 2 Kickoff",
    breakfasts:[
      { meal:"Oatmeal with Peanut Butter & Honey",cal:350,desc:"Half cup oats cooked with water. Stir in 1 tbsp peanut butter and a drizzle of honey. Sprinkle of cinnamon. Cheap, warm, and filling.",prep:"5 min",tags:["fiber","easy"] },
      { meal:"Hard-Boiled Eggs + Peanut Butter Toast",cal:350,desc:"2 hard-boiled eggs + 1 slice peanut butter toast. Fast, filling, and costs under a dollar.",prep:"0 min",tags:["protein","easy"] },
      { meal:"Yogurt + Granola + Banana",cal:300,desc:"Plain Greek yogurt + small handful of granola + sliced banana.",prep:"2 min",tags:["protein","easy"] },
    ],
    lunches:[
      { meal:"White Bean & Kale Soup batch cook",cal:330,desc:"Big pot: canned white beans, kale, diced tomatoes, chicken broth, garlic, Italian seasoning, lemon. Simmer 20 min. Eat all week.",prep:"25 min",tags:["protein","fiber","veg"] },
      { meal:"Tuna Salad Sandwich",cal:370,desc:"Canned tuna + mayo, dijon, celery, lemon. On whole grain bread with romaine.",prep:"5 min",tags:["protein","fish","easy"] },
      { meal:"Peanut Butter & Banana Wrap",cal:350,desc:"Whole wheat tortilla spread with peanut butter, sliced banana, drizzle of honey.",prep:"2 min",tags:["fiber","easy"] },
    ],
    dinners:[
      { meal:"Baked Chicken Thighs + Roasted Sweet Potatoes + Broccoli",cal:500,desc:"Chicken thighs with garlic and paprika, roasted with sweet potato cubes and broccoli florets on one sheet pan at 400F.",prep:"40 min",tags:["protein","fiber","meat"] },
      { meal:"Ground Turkey Stuffed Peppers + Brown Rice",cal:490,desc:"Bell peppers filled with seasoned ground turkey, brown rice, canned tomatoes, cheddar. Baked at 375F for 30 min.",prep:"40 min",tags:["protein","fiber","meat"] },
      { meal:"Chicken Tortilla Soup + Corn Tortillas",cal:430,desc:"Shredded chicken, canned black beans, corn, diced tomatoes, chicken broth, cumin, chili powder. Top with crushed tortilla chips.",prep:"30 min",tags:["protein","fiber","meat"] },
      { meal:"Turkey & Egg Fried Rice + Frozen Peas",cal:460,desc:"Ground turkey browned with garlic, mixed into day-old brown rice stir-fried with 2 eggs and frozen peas in soy sauce.",prep:"15 min",tags:["protein","fiber","meat"] },
      { meal:"Baked Potato + Broccoli + Cheddar + Greek Yogurt",cal:420,desc:"Large russet potato baked at 400F for 50 min. Top with steamed broccoli, shredded cheddar, Greek yogurt instead of sour cream.",prep:"55 min",tags:["fiber","easy","veg"] },
    ],
    notes:"Cook a big batch of brown rice and boil 6 eggs tonight.",
  },
  { day:"Monday",    date:"Day 9",  theme:"Locked In",
    breakfasts:[
      { meal:"Hard-Boiled Eggs + Peanut Butter Toast",cal:350,desc:"2 hard-boiled eggs from last night + 1 slice peanut butter toast. Fast, filling, and costs under a dollar.",prep:"0 min",tags:["protein","easy"] },
      { meal:"Overnight Oats with Banana",cal:340,desc:"Made last night: half cup oats + half cup milk + 1 tbsp peanut butter + sliced banana on top. Grab from the fridge.",prep:"0 min",tags:["fiber","easy"] },
      { meal:"Scrambled Eggs on Toast",cal:310,desc:"2 eggs scrambled with butter, salt, and pepper. Served on whole grain toast.",prep:"5 min",tags:["protein","easy"] },
    ],
    lunches:[
      { meal:"White Bean Soup Leftover",cal:330,desc:"Sunday's soup in a thermos. Gets better every day. Whole grain crackers on the side.",prep:"0 min",tags:["protein","fiber","easy"] },
      { meal:"Tuna Salad on Crackers + Carrot Sticks",cal:310,desc:"Canned tuna with mayo and mustard. Spread on whole grain crackers. Carrot sticks on the side.",prep:"4 min",tags:["protein","fish","easy"] },
      { meal:"Peanut Butter & Banana Wrap",cal:350,desc:"Whole wheat tortilla spread with peanut butter, sliced banana, drizzle of honey.",prep:"2 min",tags:["fiber","easy"] },
    ],
    dinners:[
      { meal:"Turkey & Egg Fried Rice + Frozen Peas",cal:460,desc:"Ground turkey browned with garlic, mixed into day-old brown rice stir-fried with 2 eggs and frozen peas in soy sauce.",prep:"15 min",tags:["protein","fiber","meat"] },
      { meal:"Baked Potato + Broccoli + Cheddar + Greek Yogurt",cal:420,desc:"Large russet potato baked at 400F for 50 min. Top with steamed broccoli, shredded cheddar, Greek yogurt.",prep:"55 min",tags:["fiber","easy","veg"] },
      { meal:"Chicken & Noodle Soup + Bread",cal:400,desc:"Leftover chicken shredded into broth with egg noodles, carrots, celery, onion. Simmer 15 min. Served with whole grain bread.",prep:"20 min",tags:["protein","meat"] },
      { meal:"Black Bean Quesadillas + Salsa + Greek Yogurt",cal:430,desc:"Whole wheat tortillas filled with canned black beans, shredded cheddar, cumin. Pan-fried crispy. Salsa and Greek yogurt.",prep:"10 min",tags:["protein","fiber","veg","easy"] },
      { meal:"Ground Turkey Stuffed Peppers + Brown Rice",cal:490,desc:"Bell peppers filled with seasoned ground turkey, brown rice, canned tomatoes, cheddar. Baked at 375F.",prep:"40 min",tags:["protein","fiber","meat"] },
    ],
    notes:"Make overnight oats tonight for Tuesday morning.",
  },
  { day:"Tuesday",   date:"Day 10", theme:"Steady Pace",
    breakfasts:[
      { meal:"Overnight Oats with Banana",cal:340,desc:"Made last night: half cup oats + half cup milk + 1 tbsp peanut butter + sliced banana on top. Grab from the fridge. Zero morning effort.",prep:"0 min",tags:["fiber","easy"] },
      { meal:"Hard-Boiled Eggs + Apple",cal:220,desc:"2 hard-boiled eggs + 1 apple. Grab and go.",prep:"0 min",tags:["protein","easy"] },
      { meal:"Yogurt + Granola + Banana",cal:300,desc:"Plain Greek yogurt + small handful of granola + sliced banana.",prep:"2 min",tags:["protein","easy"] },
    ],
    lunches:[
      { meal:"Tuna Salad on Crackers + Carrot Sticks",cal:310,desc:"Canned tuna with mayo and mustard. Spread on whole grain crackers. Carrot sticks on the side. Under $2.",prep:"4 min",tags:["protein","fish","easy"] },
      { meal:"White Bean Soup",cal:330,desc:"From thermos or microwaved. Add a drizzle of olive oil on top.",prep:"0 min",tags:["protein","fiber","easy"] },
      { meal:"Grilled Cheese + Tomato Soup",cal:450,desc:"Two slices whole grain bread with cheddar, grilled in butter. Canned tomato soup on the side.",prep:"10 min",tags:["easy"] },
    ],
    dinners:[
      { meal:"Chicken Thigh Tacos + Black Beans + Cabbage",cal:490,desc:"Baked or pan-fried chicken thighs shredded into corn tortillas. Canned black beans, shredded cabbage, salsa, Greek yogurt crema.",prep:"30 min",tags:["protein","fiber","meat"] },
      { meal:"Pasta + Garlic Olive Oil + White Beans + Parmesan",cal:470,desc:"Whole wheat pasta tossed with olive oil, lots of garlic, canned white beans, red pepper flakes, and parmesan. Budget aglio e olio.",prep:"15 min",tags:["protein","fiber","veg"] },
      { meal:"Ground Turkey Stir-Fry + Frozen Veggies + Rice",cal:450,desc:"Ground turkey stir-fried with frozen Asian vegetables in soy sauce, garlic, and ginger. Over brown rice.",prep:"20 min",tags:["protein","fiber","meat"] },
      { meal:"Lentil & Potato Curry + Brown Rice",cal:450,desc:"Red or green lentils simmered with diced potatoes, canned tomatoes, curry powder, garlic, coconut milk. Over brown rice.",prep:"30 min",tags:["protein","fiber","veg"] },
      { meal:"Cheesy Turkey & Broccoli Rice Casserole",cal:510,desc:"Ground turkey, broccoli, brown rice, chicken broth, shredded cheddar all baked together at 375F for 30 min.",prep:"40 min",tags:["protein","fiber","meat"] },
    ],
    notes:"Batch cook if you need more rice for the rest of the week.",
  },
  { day:"Wednesday", date:"Day 11", theme:"Hump Day",
    breakfasts:[
      { meal:"Scrambled Eggs + Avocado Toast",cal:370,desc:"2 scrambled eggs on a slice of whole grain toast with mashed avocado, red pepper flakes, and salt. Feels fancy but costs under $1.50.",prep:"7 min",tags:["protein","fiber"] },
      { meal:"Oatmeal with Peanut Butter & Honey",cal:350,desc:"Half cup oats cooked with water. Stir in 1 tbsp peanut butter and a drizzle of honey. Sprinkle of cinnamon.",prep:"5 min",tags:["fiber","easy"] },
      { meal:"Peanut Butter Toast + Banana",cal:320,desc:"2 slices whole grain toast spread with peanut butter. 1 banana on the side.",prep:"3 min",tags:["fiber","easy"] },
    ],
    lunches:[
      { meal:"White Bean Soup Last of Batch",cal:330,desc:"Finish the Sunday pot. Add a drizzle of olive oil on top. Whole grain bread for dipping.",prep:"0 min",tags:["protein","fiber","easy"] },
      { meal:"Tuna Salad Sandwich",cal:370,desc:"Canned tuna + mayo, dijon, celery, lemon. On whole grain bread with romaine.",prep:"5 min",tags:["protein","fish","easy"] },
      { meal:"Grilled Cheese + Tomato Soup",cal:450,desc:"Two slices whole grain bread with cheddar, grilled in butter. Canned tomato soup on the side.",prep:"10 min",tags:["easy"] },
    ],
    dinners:[
      { meal:"Baked Chicken + Sweet Potato Mash + Steamed Broccoli",cal:490,desc:"Simple baked chicken thighs. Sweet potatoes boiled and mashed with butter. Steamed broccoli with lemon. Three things, all cheap.",prep:"40 min",tags:["protein","fiber","meat"] },
      { meal:"Lentil & Potato Curry + Brown Rice",cal:450,desc:"Red or green lentils simmered with diced potatoes, canned tomatoes, curry powder, garlic. Over brown rice. Under $1.50 per serving.",prep:"30 min",tags:["protein","fiber","veg"] },
      { meal:"Cheesy Turkey & Broccoli Rice Casserole",cal:510,desc:"Ground turkey, broccoli, brown rice, chicken broth, shredded cheddar all baked together at 375F for 30 min.",prep:"40 min",tags:["protein","fiber","meat"] },
      { meal:"Egg Fried Rice + Frozen Peas + Soy Sauce",cal:420,desc:"Day-old brown rice stir-fried with 2 scrambled eggs, frozen peas, soy sauce, and garlic.",prep:"10 min",tags:["protein","fiber","easy"] },
      { meal:"Black Bean Soup + Corn Tortillas",cal:390,desc:"Canned black beans simmered with onion, garlic, cumin, chicken broth, lime. Corn tortillas for dipping.",prep:"20 min",tags:["protein","fiber","veg"] },
    ],
    notes:"Thursday grocery run, second and final shop of Week 2.",
  },
  { day:"Thursday",  date:"Day 12", theme:"Home Stretch",
    breakfasts:[
      { meal:"Yogurt + Peanut Butter + Banana",cal:310,desc:"Plain Greek yogurt with 1 tbsp peanut butter stirred in and a sliced banana on top. High protein, filling, costs about 75 cents.",prep:"2 min",tags:["protein","easy"] },
      { meal:"Hard-Boiled Eggs + Apple",cal:220,desc:"2 hard-boiled eggs + 1 apple. Grab and go.",prep:"0 min",tags:["protein","easy"] },
      { meal:"Scrambled Eggs on Toast",cal:310,desc:"2 eggs scrambled with butter, salt, and pepper. Served on whole grain toast.",prep:"5 min",tags:["protein","easy"] },
    ],
    lunches:[
      { meal:"Grilled Cheese + Tomato Soup",cal:440,desc:"Two slices whole grain bread with cheddar, grilled golden in butter. Canned tomato soup on the side. Never gets old.",prep:"10 min",tags:["easy"] },
      { meal:"Tuna Salad on Crackers + Carrot Sticks",cal:310,desc:"Canned tuna with mayo and mustard. Spread on whole grain crackers. Carrot sticks on the side.",prep:"4 min",tags:["protein","fish","easy"] },
      { meal:"Peanut Butter & Banana Wrap",cal:350,desc:"Whole wheat tortilla spread with peanut butter, sliced banana, drizzle of honey.",prep:"2 min",tags:["fiber","easy"] },
    ],
    dinners:[
      { meal:"Chicken Drumsticks + Oven Roasted Potatoes + Green Beans",cal:500,desc:"Cheapest cut on the shelf. Drumsticks baked at 400F for 35 min. Potato wedges and green beans on the same pan. Under $2 per serving.",prep:"40 min",tags:["protein","meat"] },
      { meal:"Black Bean & Corn Quesadillas + Salsa + Avocado",cal:460,desc:"Whole wheat tortillas filled with black beans, corn, cumin, cheddar. Pan-fried crispy. Sliced avocado and jarred salsa.",prep:"10 min",tags:["protein","fiber","veg","easy"] },
      { meal:"Turkey Meatball Soup + Pasta + Parmesan",cal:490,desc:"Small turkey meatballs simmered in chicken broth with ditalini pasta, carrots, and spinach. Parmesan on top.",prep:"30 min",tags:["protein","meat"] },
      { meal:"Baked Chicken + Sweet Potato Mash + Steamed Broccoli",cal:490,desc:"Simple baked chicken thighs. Sweet potatoes mashed with butter. Steamed broccoli with lemon.",prep:"40 min",tags:["protein","fiber","meat"] },
      { meal:"Pasta + Garlic Olive Oil + White Beans + Parmesan",cal:470,desc:"Whole wheat pasta tossed with olive oil, lots of garlic, canned white beans, red pepper flakes, and parmesan.",prep:"15 min",tags:["protein","fiber","veg"] },
    ],
    notes:"Two more days, you are almost at the finish line.",
  },
  { day:"Friday",    date:"Day 13", theme:"Final Push",
    breakfasts:[
      { meal:"Peanut Butter Oatmeal + Banana",cal:350,desc:"Oats cooked with water or milk, stirred with peanut butter and a sliced banana. The same breakfast that fuels marathon runners.",prep:"5 min",tags:["fiber","easy"] },
      { meal:"Overnight Oats with Banana",cal:340,desc:"Made last night: half cup oats + half cup milk + 1 tbsp peanut butter + sliced banana. Grab from the fridge.",prep:"0 min",tags:["fiber","easy"] },
      { meal:"Yogurt + Granola + Banana",cal:300,desc:"Plain Greek yogurt + small handful of granola + sliced banana.",prep:"2 min",tags:["protein","easy"] },
    ],
    lunches:[
      { meal:"Egg Salad Sandwich + Carrot Sticks",cal:360,desc:"Hard-boiled eggs mashed with a little mayo, mustard, and celery. On whole grain bread with romaine. Carrot sticks on the side.",prep:"5 min",tags:["protein","easy"] },
      { meal:"Canned Tuna Over Crackers + Apple",cal:300,desc:"Canned tuna with a little hot sauce or mustard over whole grain crackers. An apple on the side. Fast, under $2.",prep:"3 min",tags:["protein","fish","easy"] },
      { meal:"Peanut Butter & Banana Wrap",cal:350,desc:"Whole wheat tortilla spread with peanut butter, sliced banana, drizzle of honey.",prep:"2 min",tags:["fiber","easy"] },
    ],
    dinners:[
      { meal:"Baked Chicken Thighs + Garlic Rice + Roasted Zucchini",cal:480,desc:"Chicken thighs with garlic and lemon, baked at 400F. Rice cooked in chicken broth for extra flavor. Zucchini roasted alongside.",prep:"40 min",tags:["protein","meat"] },
      { meal:"Bean Burrito Bowl + Rice + Corn + Salsa",cal:460,desc:"Brown rice topped with seasoned canned pinto or black beans, frozen corn, salsa, shredded cheddar, Greek yogurt crema. Under $1.50.",prep:"10 min",tags:["protein","fiber","veg","easy"] },
      { meal:"Turkey & Vegetable Stew + Crusty Bread",cal:440,desc:"Ground turkey simmered with diced potatoes, carrots, onion, chicken broth, and Italian seasoning. Thick, hearty, warming.",prep:"35 min",tags:["protein","fiber","meat"] },
      { meal:"Chicken Thigh Tacos + Black Beans + Cabbage",cal:490,desc:"Baked or pan-fried chicken thighs shredded into corn tortillas. Canned black beans, shredded cabbage, salsa, Greek yogurt.",prep:"30 min",tags:["protein","fiber","meat"] },
      { meal:"Lentil & Potato Curry + Brown Rice",cal:450,desc:"Red or green lentils simmered with diced potatoes, canned tomatoes, curry powder, garlic. Over brown rice.",prep:"30 min",tags:["protein","fiber","veg"] },
    ],
    notes:"Last day tomorrow, make it a good one.",
  },
  { day:"Saturday",  date:"Day 14", theme:"Budget Win!",
    breakfasts:[
      { meal:"French Toast + Maple Syrup + Eggs",cal:410,desc:"Day-old bread dipped in egg and milk, pan-fried in butter. Maple syrup on top. A fried egg on the side. A celebration breakfast that costs $1.",prep:"12 min",tags:["protein","easy"] },
      { meal:"Pancakes + Eggs + Maple Syrup",cal:420,desc:"Boxed pancake mix made with egg and milk. Maple syrup on top. 2 fried eggs on the side. A real Saturday morning.",prep:"15 min",tags:["protein","easy"] },
      { meal:"Scrambled Eggs + Avocado Toast",cal:370,desc:"2 scrambled eggs on a slice of whole grain toast with mashed avocado, red pepper flakes, and salt.",prep:"7 min",tags:["protein","fiber"] },
    ],
    lunches:[
      { meal:"Big Protein Salad + Canned Tuna + Hard-Boiled Egg",cal:380,desc:"Romaine + canned tuna + hard-boiled egg + shredded carrots + cherry tomatoes + olive oil and vinegar dressing. Under $2.",prep:"7 min",tags:["protein","fish","fiber"] },
      { meal:"Grilled Cheese + Tomato Soup",cal:450,desc:"Two slices whole grain bread with cheddar, grilled in butter. Canned tomato soup on the side.",prep:"10 min",tags:["easy"] },
      { meal:"Egg Salad Sandwich + Carrot Sticks",cal:360,desc:"Hard-boiled eggs mashed with mayo, mustard, and celery. On whole grain bread with romaine. Carrot sticks.",prep:"5 min",tags:["protein","easy"] },
    ],
    dinners:[
      { meal:"Celebration Roast Chicken + Mashed Potatoes + Roasted Veggies",cal:560,desc:"A whole roasted chicken, cheapest per-pound protein. Roasted at 425F for 60 min. Fluffy mashed potatoes and roasted vegetables. You made it through 2 weeks.",prep:"70 min",tags:["protein","fiber","meat"] },
      { meal:"Chicken Thigh Piccata + Pasta + Green Beans",cal:530,desc:"Chicken thighs in lemon-caper-white wine sauce. Whole wheat pasta. Green beans sauteed with garlic. Restaurant quality at budget cost.",prep:"30 min",tags:["protein","meat"] },
      { meal:"Turkey Chili + Rice + Shredded Cheddar",cal:510,desc:"Your best batch of turkey chili, kidney beans, black beans, canned tomatoes, cumin, chili powder. Over rice with cheddar and Greek yogurt.",prep:"35 min",tags:["protein","fiber","meat"] },
      { meal:"Slow Cooker Chicken + Rice + Veggies",cal:490,desc:"Chicken thighs, chicken broth, garlic, onion, frozen vegetables all cooked together in a slow cooker on low for 6 hours.",prep:"10 min active",tags:["protein","fiber","meat"] },
      { meal:"Turkey Burgers + Oven Fries + Coleslaw",cal:520,desc:"Lean ground turkey patties seasoned with garlic and Worcestershire. Oven-baked fries. Simple coleslaw.",prep:"35 min",tags:["protein","meat"] },
    ],
    notes:"14 budget days done! You just proved eating well does not have to cost a fortune.",
  },
];

// ─── GROCERY LISTS ────────────────────────────────────────────────────────────
const GROCERY_LISTS = {
  classic: {
    sun1:{ title:"American — Week 1, Days 1–4", sections:[
      { cat:"Meat & Protein", icon:"🥩", items:["6 bone-in chicken thighs","2 chicken breasts","1 lb ground turkey","2 salmon fillets","1 lb sirloin steak","1 dozen eggs","Turkey bacon (1 pack)","Deli turkey (half lb)"] },
      { cat:"Produce", icon:"🥦", items:["2 sweet potatoes","1 bunch asparagus","2 heads broccoli","2 zucchini","3 bell peppers","1 bag baby spinach","1 bag romaine","Cherry tomatoes (1 pint)","2 avocados","2 lemons","3 bananas","Frozen mixed berries","Frozen dark cherries","Fresh rosemary","Fresh parsley","Green beans","Baby potatoes","Mushrooms (1 lb)"] },
      { cat:"Dairy", icon:"🥛", items:["Plain Greek yogurt (32 oz)","Feta cheese (crumbled)","Shredded cheddar","Cottage cheese (16 oz)","Parmesan","Protein powder (vanilla + chocolate)","Milk or oat milk","Goat cheese (optional)"] },
      { cat:"Pantry", icon:"🫙", items:["Whole grain bread","Whole wheat tortillas","Corn tortillas","Brown rice","Quinoa","Whole wheat pasta","Panko breadcrumbs","Jarred marinara","Low-sugar granola","Dijon mustard","Light mayo","Smoked paprika","Garlic powder","Italian seasoning","Ground flax","Chia seeds","Almond butter","Peanut butter","Chicken broth (32 oz)","Canned chickpeas (2 cans)","Canned white beans (2 cans)","Canned black beans (1 can)","Tahini","Olive oil","Honey","Everything bagel seasoning","Rolled oats"] },
    ]},
    thu1:{ title:"American — Week 1, Days 5–7", sections:[
      { cat:"Meat & Protein", icon:"🥩", items:["1 pork tenderloin","1 flank steak","1 rack of lamb or ribeye (celebration)","More chicken thighs (4)","Bison ground (1 lb, optional)","1 lb shrimp (surf & turf option)"] },
      { cat:"Produce", icon:"🥦", items:["Baby fingerling potatoes","Fresh parsley (for chimichurri)","More avocados (2)","Frozen acai packets (2-4)","Mixed fruit","Extra cherry tomatoes","More romaine","Apples"] },
      { cat:"Dairy", icon:"🥛", items:["Blue cheese (for dip)","More Greek yogurt if low","Mozzarella (for meatball sub option)","Truffle butter (optional)"] },
      { cat:"Pantry", icon:"🫙", items:["Red wine vinegar","BBQ sauce (clean label)","Hot sauce","Whole grain hoagie rolls","Hemp seeds","More oat milk","Marsala wine (cooking, optional)","Capers"] },
    ]},
    sun2:{ title:"American — Week 2, Days 8–11", sections:[
      { cat:"Meat & Protein", icon:"🥩", items:["6 chicken thighs (bone-in)","2 chicken breasts","1 lb ground turkey","2 salmon fillets","Turkey bacon (1 pack)","1 dozen eggs","1 lb lean ground beef"] },
      { cat:"Produce", icon:"🥦", items:["4 large bell peppers","1 bag baby spinach","Cherry tomatoes","2 cucumbers","2 avocados","Frozen corn","1 head red cabbage","Brussels sprouts (1 lb)","3 bananas","Frozen mixed berries","Frozen mango","1 spaghetti squash","Broccoli (1 head)","Snap peas","2 zucchini"] },
      { cat:"Dairy", icon:"🥛", items:["Plain Greek yogurt (32 oz)","Shredded cheddar","Feta or goat cheese","More protein powder if low","Oat milk","Parmesan"] },
      { cat:"Pantry", icon:"🫙", items:["White beans (2 cans)","Chickpeas (1 can)","Black beans (2 cans)","Brown rice","Quinoa","Rolled oats","Chia seeds","Peanut butter","Honey","Dijon mustard","Smoked paprika","Cumin","Chili powder","Chicken broth (32 oz)","Italian seasoning","Kidney beans (1 can, for chili)","Coconut milk (1 can)"] },
    ]},
    thu2:{ title:"American — Week 2, Days 12–14", sections:[
      { cat:"Meat & Protein", icon:"🥩", items:["4 thick pork chops","Chicken wings (2 lbs)","1 whole chicken or ribeye (celebration)","Filet mignon (2, optional)","1 lb shrimp (optional)","More deli turkey"] },
      { cat:"Produce", icon:"🥦", items:["Baby fingerling potatoes","Fresh thyme + rosemary","More avocados","Arugula (bag)","Apples (for slaw)","Red cabbage","More cherry tomatoes","Frozen dark cherries","Mushrooms (1 lb)","Cauliflower (1 head)","Asparagus"] },
      { cat:"Dairy", icon:"🥛", items:["Blue cheese or feta","Greek yogurt (creamed spinach)","More eggs","Parmesan (block)","Truffle butter (optional)"] },
      { cat:"Pantry", icon:"🫙", items:["Hot sauce","Garlic parmesan sauce","Tahini","More olive oil","Flaky sea salt","White wine (cooking)","Capers (for piccata option)"] },
    ]},
  },
  pescatarian: {
    sun1:{ title:"Pescatarian — Week 1, Days 1–4", sections:[
      { cat:"Fish & Seafood", icon:"🐟", items:["3 salmon fillets","2 cod fillets","1 lb shrimp (frozen, peeled)","Canned albacore tuna (2 cans)","Sushi-grade ahi tuna (2 steaks)"] },
      { cat:"Produce", icon:"🥦", items:["2 sweet potatoes","1 head broccolini","1 bag baby spinach","1 bag romaine","Cherry tomatoes (1 pint)","2 cucumbers","Shredded purple cabbage","Shredded carrots","2 avocados","3 limes","2 lemons","3 bananas","Frozen mango","Frozen pineapple","Frozen mixed berries","Frozen blueberries","Arugula","Snap peas"] },
      { cat:"Dairy & Protein", icon:"🥛", items:["Plain Greek yogurt (32 oz)","Feta cheese (crumbled)","Parmesan","Vanilla + chocolate protein powder","1 dozen eggs","Cottage cheese (16 oz)"] },
      { cat:"Pantry", icon:"🫙", items:["Canned white beans (3 cans)","Canned black beans (2 cans)","Canned chickpeas (2 cans)","Brown rice","Quinoa","Whole wheat tortillas","Corn tortillas","Ground flax","Chia seeds","Hemp seeds","Almond butter","Almond milk","Oat milk","Matcha powder","Cocoa powder","Tahini","White miso paste","Tamari","Rice vinegar","Sesame oil","Honey","Everything bagel seasoning","Low-sugar granola","Capers (jar)","Roasted red peppers (jar)","Whole grain crackers","Rolled oats","Peanut butter"] },
    ]},
    thu1:{ title:"Pescatarian — Week 1, Days 5–7", sections:[
      { cat:"Fish & Seafood", icon:"🐟", items:["2 ahi tuna steaks","2 whole branzino (or fillets)","Smoked salmon (4 oz)","1 lb scallops (optional)"] },
      { cat:"Produce", icon:"🥦", items:["Frozen acai packets (2-4)","Extra bananas","Fresh basil","Fresh parsley","Fresh mint","Kalamata olives","Red onion","Extra cherry tomatoes","Extra avocado","Edamame (frozen, shelled)","1 fennel bulb","Beets (roasted)"] },
      { cat:"Dairy", icon:"🥛", items:["More Greek yogurt if needed","Miso soup packets","Burrata (optional)"] },
      { cat:"Pantry", icon:"🫙", items:["Mirin","Pickled ginger","Red wine vinegar","Sesame seeds","Whole grain bread","Farro","Coconut milk (can)","More oat milk if needed"] },
    ]},
    sun2:{ title:"Pescatarian — Week 2, Days 8–11", sections:[
      { cat:"Fish & Seafood", icon:"🐟", items:["3 salmon fillets","1 lb shrimp (frozen)","2 ahi tuna steaks","Canned albacore tuna (2 cans)","2 cod fillets"] },
      { cat:"Produce", icon:"🥦", items:["2 heads bok choy","4 large bell peppers","1 bunch kale","Baby spinach","Cherry tomatoes","2 cucumbers","Fresh parsley (2 bunches)","Fresh mint","2 lemons","3 limes","Extra bananas","Frozen strawberries","Frozen mango","Frozen peaches","Diced tomatoes (2 cans)","Snap peas"] },
      { cat:"Dairy & Protein", icon:"🥛", items:["Plain Greek yogurt (32 oz)","Feta (block)","Parmesan","Cottage cheese (16 oz)","Cream cheese (4 oz)","1 dozen eggs"] },
      { cat:"Pantry", icon:"🫙", items:["Green or brown lentils (1 lb)","Farro","Chickpea pasta (1 box)","Vegetable broth (32 oz)","Chickpeas (2 cans)","White beans (2 cans)","Mirin","Turmeric","Smoked paprika","Cinnamon","Coriander","Whole grain pita","Coconut milk","Nori sheets","Olive tapenade (jar)","Ramen noodles (2 packs)"] },
    ]},
    thu2:{ title:"Pescatarian — Week 2, Days 12–14", sections:[
      { cat:"Fish & Seafood", icon:"🐟", items:["2 salmon fillets","Smoked salmon (4 oz)","1-2 whole sea bass","2 halibut fillets","Lobster tails (optional)","Mixed shellfish for cioppino (optional)"] },
      { cat:"Produce", icon:"🥦", items:["1 bunch asparagus","Baby potatoes","Fresh rosemary + thyme","Fresh cilantro","Extra cherry tomatoes","Frozen dark cherries","More bananas","Fresh mango","Fingerling potatoes"] },
      { cat:"Dairy", icon:"🥛", items:["More Greek yogurt","Whipped cream cheese","Burrata (1-2 balls, optional)"] },
      { cat:"Pantry", icon:"🫙", items:["More capers","More miso paste","More honey","More granola","Hemp seeds","Olive oil (if low)","Flaky sea salt","White wine (dry, for cooking)","San Marzano tomatoes (optional)"] },
    ]},
  },
  mediterranean: {
    sun1:{ title:"Mediterranean — Week 1, Days 1–4", sections:[
      { cat:"Fish, Meat & Protein", icon:"🐟", items:["2 sea bass fillets","1 lb shrimp (fresh or frozen)","Canned tuna in olive oil (2 cans)","2 chicken breasts or thighs","Ground lamb (1 lb)","1 dozen eggs"] },
      { cat:"Produce", icon:"🥦", items:["1 large eggplant","3 zucchini","2 red bell peppers","1 bag baby spinach","1 bag arugula","Cherry tomatoes (2 pints)","1 cucumber","Kalamata olives (jar)","Fresh parsley (2 bunches)","Fresh mint (1 bunch)","Fresh thyme + rosemary","2 lemons","Dried or fresh figs","Frozen mango","Frozen strawberries","Walnuts","Green beans","1 fennel bulb"] },
      { cat:"Dairy & Protein", icon:"🥛", items:["Plain Greek yogurt (32 oz)","Feta cheese (block)","Labneh or thick Greek yogurt","Part-skim ricotta (8 oz)","Vanilla protein powder","1 dozen eggs"] },
      { cat:"Pantry", icon:"🫙", items:["Couscous","Farro","Bulgur wheat","Canned white beans (3 cans)","Canned chickpeas (2 cans)","Green or brown lentils (1 lb)","Whole wheat pita (pack)","Tahini","Olive oil (extra virgin)","Za'atar spice blend","Herbes de Provence","Cumin, coriander, turmeric, cinnamon","Roasted red peppers (jar)","Olive tapenade (jar)","Honey","Pistachios","Almond milk","Oat milk","Vegetable broth","Pine nuts"] },
    ]},
    thu1:{ title:"Mediterranean — Week 1, Days 5–7", sections:[
      { cat:"Fish, Meat & Protein", icon:"🐟", items:["2 salmon fillets","2 whole branzino","Ground lamb (1 lb, kofta)","Ahi tuna (2 steaks)","Octopus (optional)","Mussels (1 lb, optional)"] },
      { cat:"Produce", icon:"🥦", items:["Extra fresh parsley","Baba ganoush (store-bought)","Stuffed grape leaves (jar)","Frozen dark cherries","More bananas","Fresh dill","Fresh cilantro","Extra cucumber","Extra cherry tomatoes","Medjool dates (box)","Parsnips","Carrots"] },
      { cat:"Dairy", icon:"🥛", items:["More Greek yogurt","Falafel (store-bought quality brand)"] },
      { cat:"Pantry", icon:"🫙", items:["Quinoa","Red wine vinegar","Dijon mustard","Capers (jar)","More za'atar","More olive oil","Sesame seeds","Hummus (store-bought)","Polenta (optional)","Red wine (cooking)"] },
    ]},
    sun2:{ title:"Mediterranean — Week 2, Days 8–11", sections:[
      { cat:"Fish, Meat & Protein", icon:"🐟", items:["3 salmon fillets","1 lb shrimp (fresh or frozen)","2 cod fillets","2 ahi tuna steaks","1 whole trout","2 chicken thighs","Ground chicken (1 lb)"] },
      { cat:"Produce", icon:"🥦", items:["2 large eggplants","3 zucchini","2 bell peppers","Baby spinach (bag)","Arugula (bag)","Cherry tomatoes","2 cucumbers","Fresh parsley + mint","Lemons (3)","Frozen mango","Medjool dates","Fresh dill","Carrots","Parsnips"] },
      { cat:"Dairy & Protein", icon:"🥛", items:["Greek yogurt (32 oz)","Feta (block)","Labneh","Cottage cheese (16 oz)","1 dozen eggs","Vanilla protein powder"] },
      { cat:"Pantry", icon:"🫙", items:["Orzo pasta","Bulgur wheat","Farro","White beans (2 cans)","Chickpeas (2 cans)","Canned tomatoes (2 cans)","Veggie broth (32 oz)","Whole grain oats","Almond milk","Dried figs","Almond butter","Walnuts","Cardamom","More cumin + coriander","Herbes de Provence","Preserved lemons (jar)","Kalamata olives"] },
    ]},
    thu2:{ title:"Mediterranean — Week 2, Days 12–14", sections:[
      { cat:"Fish, Meat & Protein", icon:"🐟", items:["2 thick swordfish steaks","2 sea bass fillets","1 leg of lamb (celebration)","Lobster tails (optional)","1 lb shrimp (paella option)","4 chicken thighs"] },
      { cat:"Produce", icon:"🥦", items:["Baby potatoes","Root vegetables (carrots, parsnips)","Fresh rosemary + garlic","Tomatoes (for shakshuka)","More cherry tomatoes","Frozen dark cherries","Extra cucumbers","Fresh basil","Lemons","1 fennel bulb","Asparagus"] },
      { cat:"Dairy", icon:"🥛", items:["More Greek yogurt","Feta (more)","Labneh","Eggs (1 dozen for shakshuka)"] },
      { cat:"Pantry", icon:"🫙", items:["Baba ganoush (more)","Stuffed grape leaves (more)","Hummus (large tub)","More whole grain pita","More tahini","Olive oil (extra bottle)","Flaky sea salt","More honey","Short-grain rice (paella option)","Red wine (cooking)"] },
    ]},
  },
  budget: {
    sun1:{ title:"Budget — Week 1, Days 1–4  (~$55-$60)", sections:[
      { cat:"Meat & Protein", icon:"🥩", items:["6 bone-in chicken thighs (~$6)","1 lb ground turkey (~$4)","Canned tuna (4 cans, ~$4)","1 dozen eggs (~$3)","Plain Greek yogurt large tub (~$5)"] },
      { cat:"Produce", icon:"🥦", items:["1 bag carrots (~$1.50)","Celery (1 bunch, ~$1.50)","1 bag yellow onions (~$2)","2 sweet potatoes (~$2)","1 head broccoli (~$1.50)","1 bag russet potatoes (~$3)","1 bag frozen mixed vegetables (~$2)","1 bunch bananas (~$1.50)","2 apples","Romaine or bag salad (~$2)"] },
      { cat:"Pantry & Grains", icon:"🫙", items:["Rolled oats large container (~$3)","Brown rice 2 lb bag (~$2)","Whole wheat bread (~$3)","Whole wheat pasta (~$2)","Whole wheat tortillas (~$3)","Peanut butter large jar (~$4)","Canned black beans 3 cans (~$3)","Canned kidney beans 1 can (~$1)","Green lentils 1 lb dry (~$2)","Canned diced tomatoes 3 cans (~$3)","Jarred marinara (~$2)","Chicken broth 32 oz (~$2)","Garlic (1 head)","Olive oil","Cumin, paprika, chili powder, Italian seasoning"] },
      { cat:"Dairy", icon:"🥛", items:["Shredded cheddar cheese (~$3)","Butter (~$3)","Milk (~$3)"] },
    ]},
    thu1:{ title:"Budget — Week 1, Days 5–7  (~$20-$25)", sections:[
      { cat:"Meat & Protein", icon:"🥩", items:["4 chicken drumsticks (~$4)","More canned tuna 2 cans (~$2)","Cream of mushroom soup 1 can (~$1.50)","Egg noodles 1 bag (~$2)"] },
      { cat:"Produce", icon:"🥦", items:["More bananas","More apples","Frozen corn 1 bag (~$1.50)","Frozen peas 1 bag (~$1.50)","Cabbage half head (~$1)","Limes (2)"] },
      { cat:"Pantry", icon:"🫙", items:["Boxed pancake mix (~$2)","Boxed cornbread mix (~$1.50)","Canned tomato soup 2 cans (~$2)","Maple syrup small bottle (~$3)","Tortilla chips small bag (~$2)","Jarred salsa (~$2)","Soy sauce (if needed)","Sesame oil small bottle (if needed)"] },
      { cat:"Dairy", icon:"🥛", items:["More eggs if running low","Mozzarella cheese (~$3, optional)","Pizza dough or English muffins (~$2, optional)"] },
    ]},
    sun2:{ title:"Budget — Week 2, Days 8–11  (~$50-$55)", sections:[
      { cat:"Meat & Protein", icon:"🥩", items:["6 bone-in chicken thighs (~$6)","1 lb ground turkey (~$4)","More canned tuna 3 cans (~$3)","1 dozen eggs (~$3)","Canned white beans 3 cans (~$3)"] },
      { cat:"Produce", icon:"🥦", items:["More carrots and celery","1 bunch kale (~$1.50)","4 bell peppers (~$3)","2 sweet potatoes (~$2)","1 head broccoli (~$1.50)","More bananas","More apples","Zucchini 2 (~$1.50)","Frozen broccoli 1 bag (~$1.50)","Avocados 2 (~$2)"] },
      { cat:"Pantry & Grains", icon:"🫙", items:["More brown rice if low (~$2)","More whole wheat pasta (~$2)","Canned black beans 2 cans (~$2)","Canned pinto beans 1 can (~$1)","Curry powder (~$2)","Coconut milk 1 can (~$2, optional)","Red lentils 1 lb (~$2)","More canned diced tomatoes 2 cans (~$2)","More chicken broth 32 oz (~$2)","Ditalini or small pasta (~$2)"] },
      { cat:"Dairy", icon:"🥛", items:["More shredded cheddar (~$3)","More plain Greek yogurt (~$5)","More butter if needed"] },
    ]},
    thu2:{ title:"Budget — Week 2, Days 12–14  (~$20-$25)", sections:[
      { cat:"Meat & Protein", icon:"🥩", items:["Chicken drumsticks 4-6 (~$4)","More ground turkey (~$4)","1 whole chicken (~$7, celebration option)","More canned tuna 2 cans (~$2)"] },
      { cat:"Produce", icon:"🥦", items:["More potatoes (~$2)","Green beans fresh or frozen (~$1.50)","More zucchini","More bananas","Cherry tomatoes small pint (~$2)","Lemons (2)","Day-old bread for French toast (~$2)"] },
      { cat:"Pantry", icon:"🫙", items:["More salsa (~$2)","More tortillas (~$3)","More canned beans if low","Maple syrup if low","Capers small jar (~$2, optional)"] },
      { cat:"Dairy", icon:"🥛", items:["More eggs","More cheddar","More Greek yogurt if low"] },
    ]},
  },
};

// ─── PLAN DATA REGISTRY ────────────────────────────────────────────────────────
const PLAN_DATA = {
  classic:       { week1:CLASS_WEEK1,  week2:CLASS_WEEK2  },
  pescatarian:   { week1:PESC_WEEK1,   week2:PESC_WEEK2   },
  mediterranean: { week1:MED_WEEK1,    week2:MED_WEEK2    },
  budget:        { week1:BUDGET_WEEK1, week2:BUDGET_WEEK2 },
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function ls(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function lsSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
function Pill({ type }) {
  const t = TAG_MAP[type] || TAG_MAP.protein;
  return <span style={{ background:t.bg, color:t.tx, fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:20, whiteSpace:"nowrap" }}>{t.label}</span>;
}

function StarBtn({ id, favs, onToggle, theme }) {
  const on = favs.includes(id);
  return (
    <button onClick={e => { e.stopPropagation(); onToggle(id); }}
      style={{ background:on?theme.accent:"transparent", border:`2px solid ${on?theme.accent:theme.border}`, borderRadius:8, cursor:"pointer", padding:"4px 8px", fontSize:13, lineHeight:1, transition:"all 0.15s", flexShrink:0 }}>
      {on ? "⭐" : "☆"}
    </button>
  );
}

function ShuffleMeal({ slot, dayId, pool, selections, onSelect, favs, onToggle, theme }) {
  const key = `${dayId}-${slot}`;
  const idx = selections[key] ?? 0;
  const meal = pool[idx];
  const icons = { breakfasts:"☀️", lunches:"🥗", dinners:"🍳" };
  const labels = { breakfasts:"Morning", lunches:"Lunch", dinners:"Dinner" };

  const shuffle = () => {
    let next = Math.floor(Math.random() * pool.length);
    if (pool.length > 1) while (next === idx) next = Math.floor(Math.random() * pool.length);
    onSelect(key, next);
  };

  return (
    <div style={{ marginBottom:14 }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:4 }}>
        <div style={{ display:"flex", alignItems:"center", gap:5 }}>
          <span>{icons[slot]}</span>
          <span style={{ fontSize:11, fontWeight:700, color:"#536065", textTransform:"uppercase", letterSpacing:"0.07em" }}>{labels[slot]}</span>
          <span style={{ fontSize:11, color:theme.mid, fontWeight:600 }}>· {meal.prep}</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:5 }}>
          <span style={{ fontSize:10, color:theme.mid, fontWeight:600 }}>{idx+1}/{pool.length}</span>
          <button onClick={shuffle} style={{ background:theme.mid, border:"none", borderRadius:20, cursor:"pointer", padding:"4px 10px", fontSize:11, fontWeight:700, color:"#fff" }}>🔀 Shuffle</button>
          <button onClick={() => onSelect(key, idx)}
            style={{ background:selections[key] !== undefined ? theme.accent : theme.light, border:`2px solid ${theme.accent}`, borderRadius:20, cursor:"pointer", padding:"4px 10px", fontSize:11, fontWeight:700, color:selections[key] !== undefined ? "#fff" : theme.primary }}>
            {selections[key] !== undefined ? "✓ Selected" : "Select"}
          </button>
          <StarBtn id={`${key}-${idx}`} favs={favs} onToggle={onToggle} theme={theme} />
        </div>
      </div>
      <div style={{ fontWeight:800, fontSize:15, color:"#1A1F1E", marginBottom:3 }}>
        {meal.meal}
        <span style={{ fontWeight:500, fontSize:13, color:theme.mid, marginLeft:6 }}>({meal.cal} cal)</span>
        {selections[key] !== undefined && <span style={{ fontSize:11, marginLeft:8, color:theme.accent, fontWeight:700 }}>✓ Locked in</span>}
      </div>
      <div style={{ fontSize:13, color:"#536065", lineHeight:1.55, marginBottom:6 }}>{meal.desc}</div>
      <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
        {meal.tags.map(t => <Pill key={t} type={t} />)}
      </div>
    </div>
  );
}

function DayCard({ d, planId, favs, onToggle, theme, selections, onSelect }) {
  const [open, setOpen] = useState(false);
  const idx = parseInt(d.date.replace("Day ","")) - 1;
  const hue = theme.dayHues[idx % theme.dayHues.length];
  const dayId = `${planId}-${d.date}`;

  return (
    <div style={{ background:"#fff", border:`1px solid ${theme.border}`, borderRadius:14, overflow:"hidden", marginBottom:10, boxShadow:"0 1px 3px rgba(0,0,0,0.05)" }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ width:"100%", padding:"14px 16px", background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", gap:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:44, height:44, borderRadius:12, background:hue, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <span style={{ color:"rgba(255,255,255,0.7)", fontSize:9, fontWeight:700 }}>{d.date}</span>
            <span style={{ color:"#fff", fontSize:13, fontWeight:900 }}>{d.day.slice(0,3).toUpperCase()}</span>
          </div>
          <div style={{ textAlign:"left" }}>
            <div style={{ fontWeight:800, fontSize:16, color:"#1A1F1E" }}>{d.day}</div>
            <div style={{ fontSize:12, color:"#536065", fontStyle:"italic" }}>{d.theme}</div>
          </div>
        </div>
        <span style={{ color:"#536065", fontSize:16, transform:open?"rotate(180deg)":"none", transition:"transform 0.2s" }}>▾</span>
      </button>

      {open && (
        <div style={{ padding:"0 16px 16px", borderTop:`1px solid ${theme.border}` }}>
          <div style={{ paddingTop:14 }}>
            <ShuffleMeal slot="breakfasts" dayId={dayId} pool={d.breakfasts} selections={selections} onSelect={onSelect} favs={favs} onToggle={onToggle} theme={theme} />
            <div style={{ height:1, background:theme.border, margin:"10px 0" }} />
            <ShuffleMeal slot="lunches"    dayId={dayId} pool={d.lunches}    selections={selections} onSelect={onSelect} favs={favs} onToggle={onToggle} theme={theme} />
            <div style={{ height:1, background:theme.border, margin:"10px 0" }} />
            <ShuffleMeal slot="dinners"    dayId={dayId} pool={d.dinners}    selections={selections} onSelect={onSelect} favs={favs} onToggle={onToggle} theme={theme} />
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

function GroceryTab({ planId, groceryData, theme, selections }) {
  const [gList, setGList] = useState("sun1");
  const [checked, setChecked] = useState({});
  const toggle = k => setChecked(p => ({ ...p, [k]: !p[k] }));

  const data = groceryData[gList];
  const total = data.sections.reduce((a,s) => a + s.items.length, 0);
  const done  = Object.values(checked).filter(Boolean).length;

  const isWeek1 = gList === "sun1" || gList === "thu1";
  const days = isWeek1 ? PLAN_DATA[planId].week1 : PLAN_DATA[planId].week2;
  const selectedMeals = [];
  days.forEach(d => {
    const dayId = `${planId}-${d.date}`;
    ["breakfasts","lunches","dinners"].forEach(slot => {
      const key = `${dayId}-${slot}`;
      if (selections[key] !== undefined) {
        selectedMeals.push(d[slot][selections[key]].meal);
      }
    });
  });

  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:14 }}>
        {[
          { id:"sun1", label:"Week 1 Sunday", sub:"Days 1–4" },
          { id:"thu1", label:"Week 1 Thursday", sub:"Days 5–7" },
          { id:"sun2", label:"Week 2 Sunday", sub:"Days 8–11" },
          { id:"thu2", label:"Week 2 Thursday", sub:"Days 12–14" },
        ].map(g => (
          <button key={g.id} onClick={() => { setGList(g.id); setChecked({}); }}
            style={{ padding:"10px 12px", borderRadius:10, cursor:"pointer", border:`2px solid ${gList===g.id ? theme.primary : theme.border}`, background:gList===g.id ? theme.light : "#fff", textAlign:"left", transition:"all 0.15s" }}>
            <div style={{ fontWeight:800, fontSize:13, color:gList===g.id ? theme.primary : "#1A1F1E" }}>{g.label}</div>
            <div style={{ fontSize:11, color:"#536065" }}>{g.sub}</div>
          </button>
        ))}
      </div>

      {selectedMeals.length > 0 && (
        <div style={{ background:theme.light, border:`1px solid ${theme.border}`, borderRadius:10, padding:"10px 14px", marginBottom:12 }}>
          <div style={{ fontWeight:800, fontSize:12, color:theme.primary, marginBottom:4 }}>✓ Your Selected Meals This Week:</div>
          <div style={{ fontSize:12, color:"#536065", lineHeight:1.7 }}>{selectedMeals.join(" · ")}</div>
        </div>
      )}

      <div style={{ background:"#fff", borderRadius:14, padding:18, border:`1px solid ${theme.border}`, boxShadow:"0 1px 4px rgba(0,0,0,0.05)" }}>
        <h2 style={{ margin:"0 0 14px", fontSize:16, fontWeight:900, color:"#1A1F1E" }}>{data.title}</h2>
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
                <div key={k} onClick={() => toggle(k)}
                  style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 10px", borderRadius:8, cursor:"pointer", marginBottom:2, background:checked[k] ? theme.seafoam : "#F7F5F0", opacity:checked[k]?0.55:1, transition:"background 0.15s" }}>
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
    </div>
  );
}

function FavoritesTab({ favs, planId, theme }) {
  const allDays = [...PLAN_DATA[planId].week1, ...PLAN_DATA[planId].week2];
  const starred = [];
  allDays.forEach(d => {
    const dayId = `${planId}-${d.date}`;
    ["breakfasts","lunches","dinners"].forEach(slot => {
      d[slot].forEach((meal, i) => {
        const id = `${dayId}-${slot}-${i}`;
        if (favs.includes(id)) starred.push({ id, day:d.day, slot, meal });
      });
    });
  });

  if (!starred.length) return (
    <div style={{ textAlign:"center", padding:"50px 20px", color:"#536065" }}>
      <div style={{ fontSize:48, marginBottom:12 }}>☆</div>
      <div style={{ fontWeight:800, fontSize:16, color:"#1A1F1E", marginBottom:6 }}>No favorites yet</div>
      <div style={{ fontSize:13, lineHeight:1.6 }}>Tap the ☆ on any meal after shuffling to save it here.</div>
    </div>
  );

  const icons = { breakfasts:"☀️", lunches:"🥗", dinners:"🍳" };
  const labels = { breakfasts:"Morning", lunches:"Lunch", dinners:"Dinner" };

  return (
    <div>
      <div style={{ background:theme.accentLight, border:`1px solid ${theme.accent}33`, borderRadius:12, padding:"12px 16px", marginBottom:16 }}>
        <div style={{ fontWeight:800, fontSize:13, color:theme.accent, marginBottom:3 }}>⭐ {starred.length} Favorite{starred.length !== 1 ? "s" : ""} Saved</div>
        <div style={{ fontSize:12, color:"#536065" }}>Ask Claude: "Build my next 2 weeks using my favorites."</div>
      </div>
      {starred.map(item => (
        <div key={item.id} style={{ background:"#fff", border:`1px solid ${theme.border}`, borderRadius:12, padding:"14px 16px", marginBottom:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
            <span>{icons[item.slot]}</span>
            <span style={{ fontSize:11, fontWeight:700, color:"#536065", textTransform:"uppercase", letterSpacing:"0.07em" }}>{labels[item.slot]}</span>
            <span style={{ fontSize:11, color:theme.mid }}>· {item.day}</span>
            <span style={{ marginLeft:"auto" }}>⭐</span>
          </div>
          <div style={{ fontWeight:800, fontSize:15, color:"#1A1F1E", marginBottom:3 }}>
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
export default function App() {
  const [plan, setPlan]   = useState("classic");
  const [view, setView]   = useState("plan");
  const [week, setWeek]   = useState(1);
  const [favs, setFavs]   = useState(() => ls("mp-favs", []));
  const [selections, setSel] = useState(() => ls("mp-sel", {}));

  const theme = THEMES[plan];
  const data  = PLAN_DATA[plan];
  const days  = week === 1 ? data.week1 : data.week2;

  const toggleFav = id => setFavs(prev => {
    const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
    lsSet("mp-favs", next); return next;
  });

  const selectMeal = (key, idx) => setSel(prev => {
    const next = { ...prev, [key]: idx };
    lsSet("mp-sel", next); return next;
  });

  const allDays = [...data.week1, ...data.week2];
  const favCount = allDays.reduce((count, d) => {
    const dayId = `${plan}-${d.date}`;
    return count + ["breakfasts","lunches","dinners"].reduce((c, slot) =>
      c + d[slot].filter((_,i) => favs.includes(`${dayId}-${slot}-${i}`)).length, 0);
  }, 0);

  const NAV = [
    { id:"plan",      label:"📋 Plan" },
    { id:"groceries", label:"🛒 Groceries" },
    { id:"favorites", label:`⭐ Faves${favCount > 0 ? ` (${favCount})` : ""}` },
  ];

  return (
    <div style={{ fontFamily:"'Inter', system-ui, sans-serif", background:"#F7F5F0", minHeight:"100vh" }}>
      <div style={{ background:theme.primary }}>
        <div style={{ maxWidth:640, margin:"0 auto" }}>
          <div style={{ display:"flex", borderBottom:"1px solid rgba(255,255,255,0.15)", overflowX:"auto" }}>
            {Object.values(THEMES).map(t => (
              <button key={t.id} onClick={() => { setPlan(t.id); setView("plan"); setWeek(1); }}
                style={{ flex:1, padding:"13px 6px", background:"none", border:"none", cursor:"pointer", fontSize:13, fontWeight:700, color:plan===t.id?"#fff":"rgba(255,255,255,0.45)", borderBottom:`3px solid ${plan===t.id?"#fff":"transparent"}`, transition:"all 0.15s", whiteSpace:"nowrap", minWidth:80 }}>
                {t.label}
              </button>
            ))}
          </div>
          <div style={{ padding:"12px 20px 0" }}>
            <h1 style={{ color:"#fff", fontSize:20, fontWeight:900, margin:0 }}>{theme.label} Plan</h1>
            <p style={{ color:"rgba(255,255,255,0.6)", fontSize:12, margin:"4px 0 12px", lineHeight:1.5 }}>{theme.tagNote} · 2 weeks · Shuffle each meal to find your favorite</p>
            <div style={{ display:"flex" }}>
              {NAV.map(tab => (
                <button key={tab.id} onClick={() => setView(tab.id)}
                  style={{ flex:1, padding:"10px 4px", background:"none", border:"none", cursor:"pointer", fontSize:12, fontWeight:700, color:view===tab.id?"#fff":"rgba(255,255,255,0.45)", borderBottom:`3px solid ${view===tab.id?theme.accent:"transparent"}`, transition:"all 0.15s", whiteSpace:"nowrap" }}>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:640, margin:"0 auto", padding:"16px 16px 60px" }}>
        {view === "plan" && (
          <>
            <div style={{ display:"flex", gap:8, marginBottom:14 }}>
              {[1,2].map(w => (
                <button key={w} onClick={() => setWeek(w)}
                  style={{ flex:1, padding:11, borderRadius:10, cursor:"pointer", border:`2px solid ${week===w?theme.primary:theme.border}`, background:week===w?theme.light:"#fff", color:week===w?theme.primary:"#536065", fontWeight:800, fontSize:14, transition:"all 0.15s" }}>
                  Week {w}
                </button>
              ))}
            </div>
            <div style={{ background:theme.light, border:`1px solid ${theme.border}`, borderRadius:10, padding:"10px 14px", marginBottom:14, fontSize:12, color:theme.primary, fontWeight:600 }}>
              💡 Tap a day to expand. Shuffle each meal until you find one you love, then hit Select to lock it in.
            </div>
            {days.map(d => (
              <DayCard key={d.date} d={d} planId={plan} favs={favs} onToggle={toggleFav} theme={theme} selections={selections} onSelect={selectMeal} />
            ))}
          </>
        )}

        {view === "groceries" && (
          <GroceryTab planId={plan} groceryData={GROCERY_LISTS[plan]} theme={theme} selections={selections} />
        )}

        {view === "favorites" && (
          <FavoritesTab favs={favs} planId={plan} theme={theme} />
        )}
      </div>
    </div>
  );
}
