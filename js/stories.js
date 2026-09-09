/* ============================================================
   stories.js
   Story bank for Reading Quest.

   Each story:
     id          unique key (also used to look up its illustration)
     level       1 (Beginner), 2 (Growing Reader), 3 (Bright Explorer)
     title       displayed title
     art         key into ReadingQuestArt.getStoryArt()
     paragraphs  array of strings (the story text)
     questions   array of { id, type, prompt, hint, sampleAnswer }
                 type: 'recall' | 'vocabulary' | 'inference' | 'imagine'
                 sampleAnswer is a *guide* shown only in the grown-up
                 review screen — comprehension answers can vary, so it's
                 a reference point, not a strict right/wrong key.

   Story length targets (roughly, like printed Cambridge readers):
     Level 1  ~220 words   Level 2  ~320 words   Level 3  ~420 words

   To add more stories later (or for another grade), copy the shape
   of any object below, add a matching illustration key in
   js/illustrations.js, and push it into STORIES.
   ============================================================ */

const STORIES = [
  /* ---------------- Level 1 — Beginner (~220 words) ---------------- */
  {
    id: 'rani_rabbit_garden',
    level: 1,
    title: "Rani Rabbit's Garden",
    art: 'rani_rabbit_garden',
    paragraphs: [
      "Rani the rabbit lived in a cosy burrow at the edge of Meadow Lane, right behind a row of tall sunflowers that nodded whenever the wind blew. Behind her home, she kept a small garden of her very own, with soft brown soil and a wobbly wooden fence to keep out hungry crows.",
      "Every morning, before the dew had even dried on the grass, Rani hopped outside with her little green watering can. She patted the soil gently and whispered to her seeds, \"Grow big and strong, my little friends,\" as if they could hear every single word.",
      "One chilly morning, Rani noticed something wonderful. Tiny green leaves were poking out of the soil in a neat little row! She gasped with delight and hopped around in three happy circles, her long ears flopping with every jump.",
      "As the weeks passed, the leaves grew taller and bushier. Rani pulled out every weed she found, and she even shooed away a cheeky crow who kept eyeing her garden a little too closely. It was hard work, but she never once complained.",
      "By the end of summer, the garden was finally ready. Rani knelt down in the soil and pulled with both paws — and out popped a fat, orange carrot, its leafy green top still dusted with soil! One by one, she filled her basket to the very top.",
      "That evening, Rani invited all her rabbit friends to a little garden feast. They sat together under the setting sun, crunching happily on sweet, crisp carrots, and Rani felt prouder than she had ever felt before."
    ],
    questions: [
      { id: 1, type: 'recall', prompt: 'What did Rani grow in her garden?', hint: 'Look at the first paragraph of the story.', sampleAnswer: 'Rani grew carrots in her garden.' },
      { id: 2, type: 'recall', prompt: 'What did Rani do every morning?', hint: 'Think about her garden chores.', sampleAnswer: 'She watered her seeds every morning and talked to them.' },
      { id: 3, type: 'inference', prompt: 'Why do you think Rani talked to her seeds like friends?', hint: 'How do you think she felt about her garden?', sampleAnswer: 'She probably loved her garden and wanted her plants to grow well and feel cared for.' },
      { id: 4, type: 'imagine', prompt: 'If you had a garden, what would you grow, and what would you name your plants?', hint: 'Use your imagination — there is no wrong answer!', sampleAnswer: 'Any imaginative, personal answer is great here.' },
    ],
  },
  {
    id: 'milo_kitten_box',
    level: 1,
    title: 'Milo and the Big Box',
    art: 'milo_kitten_box',
    paragraphs: [
      "Milo the kitten was exploring the yard one bright afternoon when he found a big, brown box sitting all by itself near the back steps. It still smelled faintly of the apples it had once carried, and its flaps stuck up like two floppy ears.",
      "Milo sniffed it carefully, walking all the way around it twice. Then he tapped it gently with one soft paw, just to make sure it wouldn't run away. When nothing happened, he took a deep breath and jumped right inside!",
      "Sitting in the dim, cardboard darkness, Milo's whiskers twitched with excitement. He decided the box was not a box at all — it was a mighty ship, sailing across a stormy grey sea. \"Meow! Hold on tight, everyone!\" he called out to no one in particular, rocking gently from side to side.",
      "He sailed past pretend islands made of flowerpots and battled pretend waves made of wind. For a whole hour, Milo was the bravest captain who had ever lived, steering his ship through every kind of danger he could imagine.",
      "Then, without any warning at all, fat raindrops began to fall from the grey sky above. Milo's mighty ship quickly turned soft and wobbly beneath his paws, sagging a little more with every drop of rain.",
      "Milo hopped out just in time, his fur only slightly damp, and dashed all the way home, giggling the entire way. That night, curled up warm and dry, he dreamed of his very next great adventure."
    ],
    questions: [
      { id: 1, type: 'recall', prompt: 'Where did Milo find the box?', hint: 'Read the first paragraph again.', sampleAnswer: 'Milo found the box in the yard, near the back steps.' },
      { id: 2, type: 'vocabulary', prompt: "The story says the box became 'wobbly'. What do you think 'wobbly' means?", hint: 'Think about what rain does to a cardboard box.', sampleAnswer: 'Wobbly means shaky or not steady, like it could fall over or collapse.' },
      { id: 3, type: 'inference', prompt: 'Why did Milo hop out of the box?', hint: 'What happened to the box in the rain?', sampleAnswer: 'The box got wet and wobbly in the rain, so it was not safe to stay inside anymore.' },
      { id: 4, type: 'imagine', prompt: 'If your box could turn into anything, what would you want it to become?', hint: 'A spaceship? A castle? Anything you like!', sampleAnswer: 'Any imaginative, personal answer is great here.' },
    ],
  },
  {
    id: 'duck_pond_race',
    level: 1,
    title: 'The Duck Pond Race',
    art: 'duck_pond_race',
    paragraphs: [
      "Three ducks lived together on a calm, blue pond at the edge of Willow Park: Daisy, Pip, and Bo. Every single morning, they paddled in slow circles around the lily pads, greeting the frogs and dragonflies who lived there too.",
      "One sunny morning, as golden light sparkled across the water, Bo had an idea. \"Let's have a race,\" he quacked, \"all the way to the old wooden post at the far end of the pond!\" Daisy and Pip flapped their wings with excitement and agreed at once.",
      "\"On your marks,\" called a wise old frog sitting on a lily pad. \"Get set... GO!\" And with a great splash, all three ducks shot forward across the sparkling water.",
      "Daisy paddled fast and steady with her strong little feet, cutting straight through the water like an arrow. Pip zig-zagged playfully around the lily pads, laughing as she went. Bo, meanwhile, took his time, humming a happy little tune and enjoying the warm sunshine on his feathers.",
      "As they neared the finish, Daisy pulled further and further ahead. With one last determined push, she reached the old wooden post first and quacked loudly with joy, spinning in a happy circle on the water.",
      "Pip and Bo arrived moments later, both cheering for their friend instead of feeling upset. \"Well done, Daisy!\" they called together. Then all three ducks splashed and played in the sunshine until it was time to swim home for supper."
    ],
    questions: [
      { id: 1, type: 'recall', prompt: 'What are the names of the three ducks?', hint: 'They are named in the first paragraph.', sampleAnswer: 'The three ducks are Daisy, Pip, and Bo.' },
      { id: 2, type: 'recall', prompt: 'Who won the race?', hint: 'Read near the end of the story.', sampleAnswer: 'Daisy won the race.' },
      { id: 3, type: 'inference', prompt: 'How do you think Pip and Bo felt when Daisy won? Why?', hint: 'Look at what they did after the race.', sampleAnswer: 'They felt happy for her because they cheered for her instead of feeling upset.' },
      { id: 4, type: 'imagine', prompt: 'If you could race an animal, which one would you pick and why?', hint: 'Think of a fast or funny animal!', sampleAnswer: 'Any imaginative, personal answer is great here.' },
    ],
  },
  {
    id: 'goat_hill_song',
    level: 1,
    title: 'The Goat on the Hill',
    art: 'goat_hill_song',
    paragraphs: [
      "A little white goat named Bimbo lived at the bottom of a tall, green hill, right beside a cluster of pine trees. More than anything else in the whole wide world, Bimbo loved to climb — up rocks, over logs, and all the way to the very top of his favourite hill.",
      "From up there, the whole valley spread out below him like a soft green blanket, dotted with tiny farmhouses and winding streams. Bimbo would stand very still, feeling the wind ruffle his fur, and breathe in the fresh mountain air.",
      "Every evening, just as the sun began to dip low in the sky, Bimbo climbed to the highest rock and sang a silly little song, one he had made up entirely by himself. It had no real words, only happy \"la-la-la\" sounds, but Bimbo sang it with all his heart.",
      "The birds would stop mid-flight to listen, tilting their heads curiously. Even the wind seemed to hum along softly, swirling around the hilltop as if it, too, enjoyed the tune.",
      "One especially golden evening, Bimbo noticed something moving far below. The other goats from the village were climbing up the hill, one after another, drawn by the sound of his silly song echoing across the valley.",
      "Soon, the whole hilltop was crowded with goats of every size and colour, all singing Bimbo's silly song together at the top of their lungs. From that evening on, the hill was never quiet again — and Bimbo never minded one bit."
    ],
    questions: [
      { id: 1, type: 'recall', prompt: "What was the goat's name?", hint: 'His name is in the first sentence.', sampleAnswer: "The goat's name was Bimbo." },
      { id: 2, type: 'recall', prompt: 'What could Bimbo see from the top of the hill?', hint: 'Read the second paragraph.', sampleAnswer: 'He could see the whole valley, with tiny farmhouses and winding streams.' },
      { id: 3, type: 'inference', prompt: 'Why do you think the other goats climbed up the hill too?', hint: 'What was Bimbo doing every evening?', sampleAnswer: 'They probably heard his happy song and wanted to join in and sing along with him.' },
      { id: 4, type: 'imagine', prompt: 'Make up two silly words for the song Bimbo might sing on the hill.', hint: 'They can be funny made-up words!', sampleAnswer: 'Any imaginative, personal answer is great here.' },
    ],
  },
  {
    id: 'hen_lost_egg',
    level: 1,
    title: "Hen's Lost Egg",
    art: 'hen_lost_egg',
    paragraphs: [
      "Mother Hen lived in a cosy red coop at the edge of Mr. Patel's farm, where she kept three smooth, speckled eggs tucked safely in a nest of warm, golden hay. Every single morning, before doing anything else, she counted them carefully: one, two, three.",
      "But one particular morning, something felt wrong. Mother Hen counted her eggs as usual — one, two — and then stopped. There were only two eggs sitting in the nest, not three. Her heart began to flutter with worry.",
      "\"Where could my third egg have gone?\" she clucked loudly, pacing back and forth across the coop. She decided at once that she would not rest until she found it, no matter how long the search took.",
      "Mother Hen searched behind the old wooden barn, peering into every dusty corner. She searched under the fence, ruffling her feathers as she squeezed through the gap. She even searched near the pond, clucking anxiously the entire time.",
      "At last, just as she was beginning to lose hope, Mother Hen spotted something round and speckled nestled gently in a patch of soft, green grass. Her missing egg had rolled all the way down the little hill behind the coop!",
      "Very carefully, she rolled the egg back home with her beak, one gentle push at a time, until it was safely tucked back into the warm hay nest. From that day on, Mother Hen checked her nest twice each morning, just to be extra, extra sure."
    ],
    questions: [
      { id: 1, type: 'recall', prompt: 'How many eggs did Mother Hen have at first?', hint: 'Read the first paragraph.', sampleAnswer: 'She had three eggs.' },
      { id: 2, type: 'recall', prompt: 'Where did Mother Hen finally find her missing egg?', hint: 'Read near the end of the story.', sampleAnswer: 'She found it in a patch of soft grass, down the hill behind the coop.' },
      { id: 3, type: 'inference', prompt: 'Why did Mother Hen start checking her nest twice after that day?', hint: 'Think about what she learned from losing the egg.', sampleAnswer: 'She wanted to make sure she never lost an egg again, so she became more careful.' },
      { id: 4, type: 'imagine', prompt: 'If the missing egg could talk, what do you think it would say about its little adventure?', hint: 'Imagine the egg telling its own story!', sampleAnswer: 'Any imaginative, personal answer is great here.' },
    ],
  },

  /* ---------------- Level 2 — Growing Reader (~320 words) ---------------- */
  {
    id: 'ravi_market_day',
    level: 2,
    title: "Ravi's Market Day",
    art: 'ravi_market_day',
    paragraphs: [
      "Every Sunday morning, without fail, Ravi went to the market with his grandmother. They would leave the house just as the sun was climbing over the rooftops, walking hand in hand down the quiet lane that led to the busy market square.",
      "The narrow lanes of the market were always crowded with colour and noise — baskets overflowing with ripe mangoes, garlands of bright orange marigold flowers, and stalls stacked high with shiny steel pots that clinked and clattered whenever someone walked by. Ravi loved weaving between the stalls, breathing in the mix of spices, flowers, and fresh bread.",
      "This particular Sunday, Grandmother stopped walking and knelt down beside him. She pressed a small, folded piece of paper and two shiny coins into his palm. \"Can you find the tomatoes yourself this time?\" she asked, smiling gently. \"I will wait right here, by the flower seller.\"",
      "Ravi felt his chest swell with pride, but a small flutter of nervousness danced in his stomach too. He had watched Grandmother shop a hundred times before, but he had never done it completely on his own.",
      "Clutching the coins tightly in his fist, he walked past the flower seller calling out her prices, past a toy stall with spinning tops and painted kites, and past a man selling roasted peanuts in twists of newspaper. At last, he spotted a bright red pile of tomatoes stacked neatly in wooden crates.",
      "\"Five tomatoes, please,\" Ravi said, trying his very best to sound grown-up. The seller smiled and weighed them carefully on his old metal scale, then dropped them gently into Ravi's cloth bag.",
      "Ravi paid with his two coins and counted his change twice, just to be absolutely sure it was correct, exactly the way Grandmother always did. When he returned, she peeked inside the bag and grinned from ear to ear. \"You did it all by yourself,\" she said warmly, patting his head with pride. Ravi couldn't stop smiling the entire walk home."
    ],
    questions: [
      { id: 1, type: 'recall', prompt: 'Who did Ravi go to the market with?', hint: 'Read the first sentence.', sampleAnswer: 'He went with his grandmother.' },
      { id: 2, type: 'vocabulary', prompt: "The story says Ravi felt 'a small flutter of nervousness'. What does 'nervousness' mean here?", hint: 'Think about doing something new and important for the first time.', sampleAnswer: 'Nervousness means feeling a little worried or unsure, like having butterflies before trying something new.' },
      { id: 3, type: 'inference', prompt: 'Why did Ravi count his change twice?', hint: 'Think about how careful he wanted to be with the coins.', sampleAnswer: 'He wanted to make sure he got the right amount of change and did the task correctly, just like his grandmother.' },
      { id: 4, type: 'imagine', prompt: 'If you went to the market alone for the first time, what would you buy and how would you feel?', hint: 'Think about your own feelings and choices.', sampleAnswer: 'Any imaginative, personal answer is great here.' },
    ],
  },
  {
    id: 'squirrel_winter_store',
    level: 2,
    title: "The Squirrel's Winter Store",
    art: 'squirrel_winter_store',
    paragraphs: [
      "As the long days of summer slowly gave way to crisp, golden autumn, the leaves in Elmwood Park began turning shades of amber and gold. It was during this colourful season that Chikki the squirrel began her most important job of the year: collecting acorns.",
      "Every single morning, while her friends played chase around the old oak tree, Chikki kept gathering, one acorn at a time. She carried each one carefully in her cheeks and tucked it away safely inside a cosy hollow near the top of her favourite tree.",
      "\"Why don't you come and play with us?\" asked a curious little sparrow one afternoon, hopping along the branch beside her. Chikki paused her work and looked up. \"Winter will come soon,\" she explained patiently, \"and there won't be any food left to find anywhere in the park. I want to be ready when that happens.\"",
      "The other squirrels overheard this and burst into giggles, rolling around on the grass. \"There's plenty of time for that later,\" they said between laughs, and went right back to their games of tag and hide-and-seek among the fallen leaves.",
      "Chikki simply shrugged and continued her work, quietly filling her hollow a little more with every passing day. She did not mind being laughed at — she had a plan, and she intended to see it through.",
      "Then, almost overnight, the first snow began to fall, blanketing the whole park in soft, sparkling white. Chikki's tree hollow was completely full of acorns, warm and well-stocked, while her friends scurried about anxiously, searching in vain for food beneath the deep snow.",
      "Seeing their hungry, worried faces, Chikki's heart softened at once. She shared her carefully saved acorns with every one of her friends that winter, making sure nobody went hungry. From that day forward, every squirrel in the park began collecting food of their own before autumn ended each year."
    ],
    questions: [
      { id: 1, type: 'recall', prompt: 'What was Chikki collecting all autumn?', hint: 'Read the first paragraph.', sampleAnswer: 'Chikki was collecting acorns.' },
      { id: 2, type: 'vocabulary', prompt: "What does 'gathering' mean in this story?", hint: 'Chikki was doing this to the acorns, one at a time.', sampleAnswer: 'Gathering means collecting or bringing things together.' },
      { id: 3, type: 'inference', prompt: 'What lesson do you think the other squirrels learned by the end of the story?', hint: 'What did they start doing after that winter?', sampleAnswer: 'They learned it is wise to prepare and plan ahead instead of waiting until it is too late.' },
      { id: 4, type: 'imagine', prompt: 'If you had to get ready for a long winter, what three things would you store away and why?', hint: 'Think about food, warmth, or fun things.', sampleAnswer: 'Any imaginative, personal answer is great here.' },
    ],
  },
  {
    id: 'monkey_mango_share',
    level: 2,
    title: 'The Monkey Who Learned to Share',
    art: 'monkey_mango_share',
    paragraphs: [
      "Deep in the heart of the jungle, Chintu the monkey found the biggest, juiciest mango tree anyone had ever seen, its branches bending low under the weight of ripe, golden fruit. Thrilled with his discovery, Chintu scrambled up the trunk in an instant and began to eat.",
      "He ate one mango, then another, and another, letting the sweet juice drip down his chin without a single care. Whenever another animal came near, hoping to share in his good fortune, Chintu chattered loudly and refused to let anyone else near the tree.",
      "One day, a little bird fluttered down onto a nearby branch, her feathers ruffled and tired. \"Chintu,\" she chirped softly, \"may I have just one mango? My babies are hungry and there is nothing left to eat near our nest.\"",
      "Chintu barely glanced at her. He shook his head firmly and swung away to another branch, his cheeks already stuffed full of fruit. The little bird watched him sadly before flying off to search elsewhere.",
      "Days passed, and Chintu ate so many mangoes that his tummy began to ache terribly. He lay curled up beneath the very same tree, groaning softly, while the other jungle animals passed by quietly, carrying their own modest meals.",
      "Not one of them stopped to help — except for the little bird. Despite everything that had happened, she flew down with a large leaf cupped carefully in her tiny beak, filled with cool water, and offered it gently to Chintu.",
      "Chintu felt a wave of shame wash over him as he sipped the water gratefully. He realised, at last, how unkind he had been. From that day on, Chintu always shared his mangoes freely with his jungle friends, and he never once forgot the little bird's kindness."
    ],
    questions: [
      { id: 1, type: 'recall', prompt: 'What kind of tree did Chintu find?', hint: 'Read the first sentence.', sampleAnswer: 'He found a mango tree.' },
      { id: 2, type: 'recall', prompt: 'Who brought Chintu water when his tummy ached?', hint: 'Read near the end of the story.', sampleAnswer: 'The little bird brought him water.' },
      { id: 3, type: 'inference', prompt: 'Why do you think Chintu felt ashamed at the end of the story?', hint: 'Think about how he had treated the bird earlier.', sampleAnswer: 'He felt ashamed because the bird was kind to him even though he had refused to share earlier.' },
      { id: 4, type: 'imagine', prompt: 'Imagine you had a whole tree of your favourite fruit. Who would you share it with and why?', hint: 'Think about people or animals you would like to share with.', sampleAnswer: 'Any imaginative, personal answer is great here.' },
    ],
  },
  {
    id: 'fox_clever_plan',
    level: 2,
    title: "The Fox's Clever Plan",
    art: 'fox_clever_plan',
    paragraphs: [
      "One crisp autumn morning, a hungry fox was wandering through the forest, his stomach growling with every step, when he spotted a large piece of cheese held tightly in a crow's beak, high up on a branch above him.",
      "The fox stopped in his tracks and stared up longingly. He knew, of course, that he could never climb the smooth trunk of the tree, and jumping certainly wouldn't reach that high. So instead, he sat down calmly and began to think of a clever plan.",
      "\"What a beautiful bird you are,\" the fox called out sweetly, tilting his head to one side. \"I have heard that crows sing the most wonderful songs in the entire forest. Won't you sing just one note for me?\"",
      "The crow puffed out her chest proudly, quite flattered by such generous praise. No one had ever complimented her singing before, and she felt certain, in that moment, that the fox spoke nothing but the truth.",
      "Without thinking twice, she opened her beak wide to let out a loud, proud caw — and the moment she did, the cheese tumbled straight down through the air, landing perfectly at the fox's feet.",
      "The fox snatched it up at once, gave a small, satisfied bow, and trotted away into the trees, quite pleased with himself and his clever trick.",
      "The crow watched him go, feeling rather silly indeed. But she remembered the lesson well for the rest of her life: kind words are not always honest ones, and it is always wise to think carefully before acting on flattery."
    ],
    questions: [
      { id: 1, type: 'recall', prompt: 'What did the crow have in her beak?', hint: 'Read the first sentence.', sampleAnswer: 'The crow had a piece of cheese.' },
      { id: 2, type: 'vocabulary', prompt: "The story says the crow was 'flattered'. What does that mean?", hint: 'Think about how she felt when the fox praised her voice.', sampleAnswer: 'Flattered means she felt pleased and proud because of the fox\'s nice words.' },
      { id: 3, type: 'inference', prompt: 'Why did the fox praise the crow instead of asking for the cheese directly?', hint: 'Think about his clever plan.', sampleAnswer: 'He wanted to trick her into opening her beak so the cheese would fall, since asking directly would not have worked.' },
      { id: 4, type: 'imagine', prompt: 'If you were the crow, what could you have done differently to keep your cheese?', hint: 'Think of a smarter choice she could have made.', sampleAnswer: 'Any imaginative, personal answer is great here.' },
    ],
  },
  {
    id: 'turtle_race_lesson',
    level: 2,
    title: "The Turtle's Race Lesson",
    art: 'turtle_race_lesson',
    paragraphs: [
      "In a sunny meadow full of clover and buttercups, there lived a quick-footed rabbit who loved nothing more than showing off his incredible speed. He often teased a slow-moving turtle who lived nearby, laughing at how long it took him to cross even the smallest patch of grass.",
      "One day, tired of the constant teasing, the turtle stopped, looked the rabbit steadily in the eye, and said, \"Let us have a race, then, across this whole meadow. We shall see who truly wins in the end.\"",
      "The rabbit burst out laughing so hard that tears formed in his eyes. \"A race? Against you?\" he chuckled. \"Very well, turtle, if that is what you truly wish.\" Word spread quickly, and soon all the animals of the meadow gathered eagerly along the racing path to watch.",
      "When the race began, the rabbit dashed ahead so fast that he was soon far, far in front, nothing more than a small dot in the distance. Feeling completely certain that victory was already his, he decided to stop and rest beneath a cool, shady tree along the way.",
      "\"I have plenty of time to spare,\" he thought to himself, stretching out comfortably on the soft grass. Within minutes, his eyes grew heavy, and he drifted off into a deep, contented nap.",
      "Meanwhile, the turtle kept walking, slow and steady, without stopping even once to rest. Step by careful step, he plodded onward beneath the warm sun, never once looking back or losing his determined pace.",
      "Eventually, the turtle passed the sleeping rabbit entirely, moving ever closer to the finish line with each patient stride. The rabbit finally woke with a start, realising his terrible mistake, and dashed forward as fast as his legs could possibly carry him.",
      "But it was already too late. The turtle had crossed the finish line moments before, and every single animal in the meadow cheered loudly for his slow, steady, and truly remarkable effort."
    ],
    questions: [
      { id: 1, type: 'recall', prompt: 'Who challenged whom to a race?', hint: 'Read the second paragraph.', sampleAnswer: 'The turtle challenged the rabbit to a race.' },
      { id: 2, type: 'recall', prompt: 'Why did the rabbit stop running during the race?', hint: 'Read the middle of the story.', sampleAnswer: 'He felt sure he would win, so he stopped to rest under a tree and fell asleep.' },
      { id: 3, type: 'inference', prompt: 'What lesson does this story teach us?', hint: 'Think about how the turtle won even though he was slow.', sampleAnswer: 'Being steady and never giving up can help you succeed, even if you are not the fastest.' },
      { id: 4, type: 'imagine', prompt: 'If you raced the turtle, what would your plan be to try and win?', hint: 'Think of a smart strategy.', sampleAnswer: 'Any imaginative, personal answer is great here.' },
    ],
  },

  /* ---------------- Level 3 — Bright Explorer (~420 words) ---------------- */
  {
    id: 'starlit_camping',
    level: 3,
    title: 'A Starlit Camping Night',
    art: 'starlit_camping',
    paragraphs: [
      "Meera had never once slept outside in her entire life, so when her family pitched a bright orange tent right in the middle of their backyard that Saturday evening, her heart fluttered with a strange mix of excitement and just a little bit of worry.",
      "\"Are there really no walls at all?\" she asked her father, peering doubtfully into the tent's dim, canvas interior. He laughed warmly and ruffled her hair. \"The whole sky will be our roof tonight,\" he said. \"You'll see — it's the best roof there is.\"",
      "As dinner was cooked over a small, crackling campfire, Meera helped her mother roast marshmallows on long wooden sticks, watching them turn golden brown and gooey in the flickering firelight. The smell of woodsmoke drifted lazily through the cool evening air.",
      "As the sky slowly darkened from orange to deep purple to velvety black, thousands upon thousands of stars began to appear overhead, scattered like sugar sprinkled across a dark cloth. Meera had never seen so many stars in one place before.",
      "Her father lay back on the picnic blanket and pointed upward. \"Do you see that pattern, shaped almost like a giant spoon?\" he asked. \"People have called it the Great Bear for thousands and thousands of years.\" Meera traced the shape carefully with her finger, memorising it.",
      "\"Can stars really just disappear?\" Meera asked curiously, snuggling deeper into her sleeping bag as the night grew cooler. Her mother smiled and shook her head gently. \"They're always there, sweetheart,\" she explained. \"It's simply that sunlight during the day is far too bright for our eyes to see their light.\"",
      "Meera thought about this for a long moment, watching a single star blink softly above the treetops. It seemed almost magical to her that something could be there the whole time, invisible, just waiting patiently for darkness to reveal it.",
      "Wrapped snugly in her sleeping bag, listening to the gentle chirping of crickets all around the tent, Meera finally closed her eyes. She drifted off to sleep imagining herself floating gently among the very stars she had just learned about, feeling braver and more curious than she had felt all evening."
    ],
    questions: [
      { id: 1, type: 'recall', prompt: 'What shape did Meera\'s father point out in the sky?', hint: 'Read the fifth paragraph.', sampleAnswer: 'He pointed out a shape like a giant spoon, called the Great Bear.' },
      { id: 2, type: 'vocabulary', prompt: "The story says the stars were 'scattered like sugar across a dark cloth'. What is this describing?", hint: 'Think about how the night sky looked to Meera.', sampleAnswer: 'It describes how the many stars were spread out across the dark night sky, like sugar sprinkled on a dark cloth.' },
      { id: 3, type: 'inference', prompt: 'Why do we not see stars during the daytime, according to the story?', hint: 'Read what Meera\'s mother explained.', sampleAnswer: 'Sunlight during the day is much too bright, so it hides the light of the stars from us.' },
      { id: 4, type: 'imagine', prompt: 'If you could float among the stars for one night, what would you want to see or do there?', hint: 'Let your imagination fly!', sampleAnswer: 'Any imaginative, personal answer is great here.' },
    ],
  },
  {
    id: 'space_explorers',
    level: 3,
    title: 'The Little Space Explorers',
    art: 'space_explorers',
    paragraphs: [
      "Far beyond the moon, past streaks of glittering stardust, Zara and her robot friend Bolt zoomed through the endless stars in their tiny silver rocket, searching eagerly for a planet that no one from Earth had ever visited before.",
      "Bolt's control panel beeped steadily, tracking their course through the darkness. \"Scanning ahead,\" he announced in his cheerful, metallic voice. \"I am detecting something unusual, three hundred kilometres to the left.\" Zara leaned forward eagerly in her seat, straining to see through the window.",
      "\"Look, Bolt!\" Zara pointed excitedly at a glowing orange planet that had just come into view, wrapped in rings that spun slowly like a giant, shimmering hula-hoop. \"It looks like it's wearing a necklace made entirely of light!\"",
      "Bolt steered the rocket carefully closer, adjusting the controls with quiet clicks and whirs. \"Preparing for landing,\" he said. \"Hold on tight, Zara — this might be a little bumpy.\" The rocket shuddered gently as it touched down on the strange, dusty surface.",
      "They landed with barely a bump and stepped out together in their shiny silver suits, boots crunching against the ground below. The soil crunched like crushed biscuits beneath every step they took, and strange blue plants nearby swayed gently from side to side, even though there was no wind at all.",
      "\"Curious,\" Bolt murmured, extending a small scanning arm toward the nearest plant. He beeped happily after a moment. \"They glow whenever you get close to them,\" he announced. \"I believe they can sense us somehow.\"",
      "Zara laughed with delight and danced carefully among the glowing plants, watching them light up one after another like tiny lanterns switching on. Soon, the whole quiet planet was glowing softly around her, transformed into something that looked exactly like a magical carnival.",
      "\"We should name this place,\" Zara said thoughtfully, spinning slowly to take in the glowing landscape all around them. \"How about... Lumina?\" Bolt beeped his agreement enthusiastically, already recording the name into his memory banks for the history books back home.",
      "As the two strange moons of Lumina rose slowly overhead, Zara knew this would be a story she would tell for the rest of her life — the day she and Bolt discovered the most beautiful, glowing planet in the entire galaxy."
    ],
    questions: [
      { id: 1, type: 'recall', prompt: 'What did Zara and Bolt travel in?', hint: 'Read the first sentence.', sampleAnswer: 'They travelled in a tiny silver rocket.' },
      { id: 2, type: 'vocabulary', prompt: "The ground 'crunched like crushed biscuits'. What does this tell you about how the ground felt?", hint: 'Think about the sound and feeling of walking on crushed biscuits.', sampleAnswer: 'It tells us the ground was crumbly and made a crunchy sound when they walked on it.' },
      { id: 3, type: 'inference', prompt: 'Why do you think the blue plants swayed even though there was no wind?', hint: 'This is a mystery in the story — what could be a magical or scientific reason?', sampleAnswer: 'This is left for imagination — perhaps the plants moved and glowed because they could sense Zara and Bolt being near them.' },
      { id: 4, type: 'imagine', prompt: 'Design your own planet! What color is it, and what strange plant or creature lives there?', hint: 'Be as wild and creative as you like.', sampleAnswer: 'Any imaginative, personal answer is great here.' },
    ],
  },
  {
    id: 'garden_of_kindness',
    level: 3,
    title: 'The Garden of Kindness',
    art: 'garden_of_kindness',
    paragraphs: [
      "Old Mr. Fernandes owned the saddest, most neglected garden anywhere on Willow Street — dry, cracked soil, drooping brown leaves, and not a single flower in sight, no matter the season. Children often hurried past his gate without a second glance, and even the birds seemed to avoid the quiet, empty yard.",
      "One warm afternoon, a girl named Ayesha was walking home from school when she noticed Mr. Fernandes struggling to carry a heavy metal watering can from his back porch toward the flower beds, his arms trembling slightly under its weight.",
      "Without being asked, and without a moment's hesitation, Ayesha dropped her school bag by the gate and ran over to help. Together, they carried the heavy can all the way to the far side of the garden, water sloshing gently with every careful step.",
      "\"Thank you, child,\" Mr. Fernandes said, wiping his brow with a tired but genuine smile. \"It has been a long time since anyone offered to help an old man like me.\" Ayesha simply smiled back and promised she would visit again soon.",
      "True to her word, she returned the very next day — this time with two of her friends from school. Together, the three of them pulled stubborn weeds from the cracked soil and planted small seeds carefully along the wooden fence, patting the earth gently over each one.",
      "Slowly, over the following weeks, more and more children began to join in. Some watered the thirsty soil each morning before school. Others simply sat beside Mr. Fernandes on his porch, listening to his stories about gardens he had grown many years ago, back when his wife was still alive.",
      "Mr. Fernandes began to look forward to their visits more than anything else in his quiet days. His garden, once so silent and empty, now buzzed with laughter, chatter, and the gentle sound of small hands digging happily in the soil.",
      "By springtime, the garden was utterly transformed, bursting with colour from one end to the other: bright marigolds, climbing roses, and tiny sunflowers that turned their cheerful faces to follow the sun across the sky each day.",
      "Standing among the blooms one sunny morning, Mr. Fernandes turned to Ayesha with tears of happiness in his eyes. \"This garden,\" he said softly, \"never truly needed better soil at all. It simply needed kind hands — and I am so very grateful it finally found them.\""
    ],
    questions: [
      { id: 1, type: 'recall', prompt: 'What was the first kind thing Ayesha did for Mr. Fernandes?', hint: 'Read the third paragraph.', sampleAnswer: 'She helped him carry his heavy watering can.' },
      { id: 2, type: 'vocabulary', prompt: "What does it mean that the garden was 'bursting with colour'?", hint: 'Think about how a garden full of many flowers would look.', sampleAnswer: 'It means the garden was full of many bright, colourful flowers.' },
      { id: 3, type: 'inference', prompt: "What did Mr. Fernandes mean when he said the garden 'needed kind hands' instead of better soil?", hint: 'Think about what actually changed the garden.', sampleAnswer: 'He meant that the children\'s kindness and effort, not just good soil, was what truly helped the garden grow.' },
      { id: 4, type: 'imagine', prompt: 'Think of one kind thing you could do this week for a neighbour or an elderly person. What would you do?', hint: 'This can be something small and real!', sampleAnswer: 'Any imaginative, personal answer is great here.' },
    ],
  },
  {
    id: 'elephant_river_help',
    level: 3,
    title: 'The Elephant Who Helped',
    art: 'elephant_river_help',
    paragraphs: [
      "During a long season of heavy monsoon rain, the wide river that curved gently along the edge of the forest rose higher and higher with every passing day, until at last it completely flooded the narrow path that all the smaller animals relied on to cross safely each morning.",
      "By the time the rain finally eased, the water had become a wide, churning stretch far too dangerous for anyone small to attempt crossing alone. The rabbits, mice, and small forest birds gathered nervously at the water's muddy edge, unsure of how they might possibly reach the other side.",
      "Even the strongest swimmers among them, a family of otters who normally loved the water, looked genuinely worried by the speed of the current sweeping past. \"It's simply too fast,\" one otter murmured, shaking her head slowly. \"We could easily be swept away.\"",
      "News of their trouble reached gentle old Elephant, who lived in a quiet clearing not far from the riverbank. Without a single moment's hesitation, he made his way through the trees and down to the water's edge, his heavy footsteps shaking the wet earth beneath him.",
      "\"Climb aboard,\" he rumbled kindly, lowering his broad back and curling his long trunk into a gentle, sturdy ramp. The smaller animals hesitated for only a moment before scrambling up, two or three at a time, gripping tightly onto his rough, grey skin.",
      "Elephant waded carefully into the rushing water, moving slowly and steadily against the powerful current. His enormous legs held firm against the water's pull, and his passengers clung on tightly, trusting him completely with every splashing step.",
      "Trip after trip, he carried every last animal safely across to the far bank, never once complaining about the effort or the cold, muddy water soaking his legs. By the time the very last mouse had been delivered safely, the sun had already begun sinking low behind the trees.",
      "Exhausted but quietly satisfied, Elephant settled down on the riverbank to rest. The animals gathered around him gratefully, offering their thanks with a joyful chorus of chirps, squeaks, and small, respectful bows.",
      "\"You didn't have to help us,\" the otter said softly, still amazed by his kindness. Elephant simply smiled and shook his great head. \"When someone needs help,\" he said gently, \"there is no such thing as too much trouble.\""
    ],
    questions: [
      { id: 1, type: 'recall', prompt: 'Why were the smaller animals unable to cross the river?', hint: 'Read the first two paragraphs.', sampleAnswer: 'The river had flooded and the current was too fast and dangerous for them.' },
      { id: 2, type: 'vocabulary', prompt: "The elephant helped 'without a single moment's hesitation'. What does 'hesitation' mean here?", hint: 'Think about how quickly he decided to help.', sampleAnswer: 'Hesitation means pausing or being unsure before doing something — the elephant did not pause at all.' },
      { id: 3, type: 'inference', prompt: 'What character traits does the elephant show in this story?', hint: 'Think about what he did for the smaller animals.', sampleAnswer: 'He shows kindness, courage, and helpfulness, since he calmly helped every animal without expecting anything back.' },
      { id: 4, type: 'imagine', prompt: 'If you were as strong and helpful as the elephant for one day, who would you help and how?', hint: 'Think about people or animals around you.', sampleAnswer: 'Any imaginative, personal answer is great here.' },
    ],
  },
  {
    id: 'owl_night_school',
    level: 3,
    title: "Professor Owl's Night School",
    art: 'owl_night_school',
    paragraphs: [
      "Deep in the heart of the forest, when the moon rose high and round above the treetops, Professor Owl opened her Night School beneath the tallest pine tree, ready and waiting to teach anyone curious enough to attend her evening lessons.",
      "Word of her school had spread quietly among the younger forest animals over many months, and by the time the moon had fully risen, a small crowd of young foxes, rabbits, and even a sleepy badger cub had gathered on the soft pine needles below her branch.",
      "\"Tonight,\" she hooted grandly, adjusting her tiny wire spectacles with one careful claw, \"we shall learn why I am able to turn my head almost all the way around, while none of you are able to do the very same thing.\"",
      "The young foxes and rabbits leaned in closer immediately, thoroughly fascinated by the mysterious question. A rabbit near the front raised her paw eagerly. \"Does it not hurt terribly, Professor?\" she asked, wide-eyed with curiosity.",
      "Professor Owl chuckled softly, a low, warm sound. \"Not at all, my dear,\" she replied. \"You see, owls have many more bones in our necks than most other animals do — far more than you might expect.\"",
      "She went on to explain, quite patiently, that this remarkable number of extra neck bones allowed her to look far behind herself without ever needing to move her whole body at all. \"It is perfect,\" she continued, \"for spotting danger, or perhaps a tasty dinner, hidden somewhere in the dark.\"",
      "One curious young fox raised his paw next. \"Could a fox ever learn to do that too?\" he asked hopefully. Professor Owl shook her head kindly. \"Every creature has its own special gift,\" she said. \"Yours, little fox, is your remarkably clever nose.\"",
      "By the end of the lesson, every single student was attempting, with great determination, to twist their own necks like the wise old professor, giggling uncontrollably and toppling sideways into the soft pine needles scattered across the forest floor.",
      "Professor Owl watched them with quiet amusement, her large amber eyes glowing softly in the moonlight. \"Class dismissed for tonight,\" she announced warmly. \"Same time tomorrow, my curious little students — there is always more to learn.\""
    ],
    questions: [
      { id: 1, type: 'recall', prompt: "Where did Professor Owl hold her Night School?", hint: 'Read the first sentence.', sampleAnswer: 'She held it beneath the tallest pine tree.' },
      { id: 2, type: 'vocabulary', prompt: "The animals were 'fascinated' by the lesson. What does 'fascinated' mean?", hint: 'Think about how interested and curious they were.', sampleAnswer: 'Fascinated means being very interested in something, wanting to know more.' },
      { id: 3, type: 'inference', prompt: 'Why is it useful for an owl to turn its head almost all the way around?', hint: 'Read what Professor Owl explains in the story.', sampleAnswer: 'It helps the owl spot danger or food behind itself without having to turn its whole body, which is quicker and quieter.' },
      { id: 4, type: 'imagine', prompt: 'If you could learn one amazing skill from an animal, which animal and skill would you choose?', hint: 'Think about any animal ability you find amazing.', sampleAnswer: 'Any imaginative, personal answer is great here.' },
    ],
  },
  {
    id: 'dog_new_friend',
    level: 3,
    title: 'Buddy Finds a New Friend',
    art: 'dog_new_friend',
    paragraphs: [
      "Buddy the dog had always loved his sunny backyard, with its patch of soft grass beneath the old mango tree and its warm spot by the fence where the afternoon sun lingered longest. But lately, something had changed, and Buddy felt a quiet loneliness settle over his days.",
      "His very best friend, a boy named Arjun who used to visit every single afternoon after school, had moved away to a different street clear across town. Their games of fetch and long, lazy afternoons together had simply stopped, and the yard felt far too quiet without him.",
      "One warm afternoon, as Buddy lay stretched out beneath the mango tree, he noticed something moving slowly along the fence. A small black cat crept carefully along the wooden planks, glancing around nervously, looking just as lonely and uncertain as Buddy himself had been feeling.",
      "Buddy's first instinct was to bark, the way he always did whenever anything unfamiliar entered the yard. But something about the cat's cautious, weary movements made him pause. Instead of barking, he sat down quietly and let out a soft, gentle whine.",
      "The cat froze at the sound, ears twitching nervously, clearly ready to bolt at the slightest sign of danger. But Buddy remained perfectly still, his tail giving only the smallest, friendliest wag against the grass.",
      "Slowly, and with obvious caution, the cat crept closer, pausing every few steps to watch Buddy carefully. Eventually, she settled down beside him in the warm patch of sunlight, keeping a small, careful distance between them at first.",
      "Neither animal said a single word — of course, they couldn't have, even if they wanted to — but somehow, in the comfortable silence, they understood each other perfectly. Two creatures, each missing someone, finding quiet comfort in unexpected company.",
      "From that day onward, the unlikely pair met faithfully by the fence every single afternoon, sharing the warm patch of sunlight together without fail. Buddy still missed Arjun dearly, and probably always would, but his heart felt undeniably lighter now, knowing he had found a true new friend after all.",
      "Sometimes, Buddy thought, the best friendships arrive when you least expect them — quietly, gently, and exactly when your heart needs them most."
    ],
    questions: [
      { id: 1, type: 'recall', prompt: 'Why did Buddy feel lonely at the start of the story?', hint: 'Read the second paragraph.', sampleAnswer: 'His best friend Arjun had moved to a different street across town.' },
      { id: 2, type: 'inference', prompt: 'Why do you think Buddy chose to whine softly instead of barking at the cat?', hint: 'Think about how he wanted the cat to feel.', sampleAnswer: 'He probably wanted to seem friendly and gentle instead of scaring the cat away.' },
      { id: 3, type: 'inference', prompt: "What does the story mean by saying Buddy's heart 'felt undeniably lighter'?", hint: 'Think about his feelings by the end of the story.', sampleAnswer: 'It means he felt happier and less sad, even though he still missed his old friend.' },
      { id: 4, type: 'imagine', prompt: 'Write about a time you felt lonely and something (or someone) that made you feel better.', hint: 'This can be a real memory or an imagined one.', sampleAnswer: 'Any imaginative, personal answer is great here.' },
    ],
  },
];

window.ReadingQuestStories = STORIES;