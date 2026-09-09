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

   To add more stories later (or for another grade), copy the shape
   of any object below, add a matching illustration key in
   js/illustrations.js, and push it into STORIES.
   ============================================================ */

const STORIES = [
  /* ---------------- Level 1 — Beginner ---------------- */
  {
    id: 'rani_rabbit_garden',
    level: 1,
    title: "Rani Rabbit's Garden",
    art: 'rani_rabbit_garden',
    paragraphs: [
      "Rani the rabbit had a small garden behind her burrow. Every morning, she watered her carrots and talked to them like friends.",
      "One day, she saw tiny green leaves poking out of the soil. \"Hello, little carrots!\" she laughed, and hopped around in a happy circle.",
      "By the end of summer, Rani pulled out fat, orange carrots. She shared them with all her rabbit friends in the meadow."
    ],
    questions: [
      { id: 1, type: 'recall', prompt: 'What did Rani grow in her garden?', hint: 'Look at the first line of the story.', sampleAnswer: 'Rani grew carrots in her garden.' },
      { id: 2, type: 'recall', prompt: 'What did Rani do every morning?', hint: 'Think about her garden chores.', sampleAnswer: 'She watered her carrots every morning.' },
      { id: 3, type: 'inference', prompt: 'Why do you think Rani talked to her carrots like friends?', hint: 'How do you think she felt about her garden?', sampleAnswer: 'She probably loved her garden and wanted her carrots to grow well and feel cared for.' },
      { id: 4, type: 'imagine', prompt: 'If you had a garden, what would you grow, and what would you name your plants?', hint: 'Use your imagination — there is no wrong answer!', sampleAnswer: 'Any imaginative, personal answer is great here.' },
    ],
  },
  {
    id: 'milo_kitten_box',
    level: 1,
    title: 'Milo and the Big Box',
    art: 'milo_kitten_box',
    paragraphs: [
      "Milo the kitten found a big brown box in the yard. He sniffed it, tapped it with his paw, and then jumped right inside!",
      "Inside the box, Milo pretended it was a ship sailing on a stormy sea. \"Meow! Hold on tight!\" he said to himself.",
      "When it began to rain, Milo's box became soft and wobbly. He hopped out just in time and ran home, giggling all the way."
    ],
    questions: [
      { id: 1, type: 'recall', prompt: 'Where did Milo find the box?', hint: 'Read the first sentence again.', sampleAnswer: 'Milo found the box in the yard.' },
      { id: 2, type: 'vocabulary', prompt: "The story says the box became 'wobbly'. What do you think 'wobbly' means?", hint: 'Think about what rain does to a paper or cardboard box.', sampleAnswer: 'Wobbly means shaky or not steady, like it could fall over.' },
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
      "Three ducks lived on a calm blue pond: Daisy, Pip, and Bo. One sunny morning, they decided to race to the old wooden post.",
      "Daisy paddled fast with her strong little feet. Pip zig-zagged around the lily pads. Bo took his time, humming a happy tune.",
      "Daisy reached the post first and quacked with joy. Pip and Bo cheered for her, and then all three ducks splashed and played together."
    ],
    questions: [
      { id: 1, type: 'recall', prompt: 'What are the names of the three ducks?', hint: 'They are named in the first sentence.', sampleAnswer: 'The three ducks are Daisy, Pip, and Bo.' },
      { id: 2, type: 'recall', prompt: 'Who won the race?', hint: 'Read the last paragraph.', sampleAnswer: 'Daisy won the race.' },
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
      "A little white goat named Bimbo loved to climb the green hill near his home. From the top, he could see the whole valley.",
      "Every evening, Bimbo stood on the highest rock and sang a silly song. The birds would stop to listen, and the wind seemed to hum along.",
      "One evening, the other goats climbed up too. Soon, the whole hill was full of goats singing Bimbo's silly song together."
    ],
    questions: [
      { id: 1, type: 'recall', prompt: "What was the goat's name?", hint: 'His name is in the first sentence.', sampleAnswer: "The goat's name was Bimbo." },
      { id: 2, type: 'recall', prompt: 'What could Bimbo see from the top of the hill?', hint: 'Read the first paragraph.', sampleAnswer: 'He could see the whole valley.' },
      { id: 3, type: 'inference', prompt: 'Why do you think the other goats climbed up the hill too?', hint: 'What was Bimbo doing every evening?', sampleAnswer: 'They probably wanted to join in and sing the fun song with him.' },
      { id: 4, type: 'imagine', prompt: 'Make up two silly words for the song Bimbo might sing on the hill.', hint: 'They can be funny made-up words!', sampleAnswer: 'Any imaginative, personal answer is great here.' },
    ],
  },
  {
    id: 'hen_lost_egg',
    level: 1,
    title: "Hen's Lost Egg",
    art: 'hen_lost_egg',
    paragraphs: [
      "Mother Hen counted her eggs every morning: one, two, three. But one day, she counted only two eggs in the warm hay nest.",
      "She searched behind the barn, under the fence, and near the pond, clucking loudly. At last, she found her third egg rolled softly into a patch of soft grass.",
      "Mother Hen carefully rolled the egg back to the nest with her beak. From that day on, she checked her nest twice before going for a walk."
    ],
    questions: [
      { id: 1, type: 'recall', prompt: 'How many eggs did Mother Hen have at first?', hint: 'Read the first sentence.', sampleAnswer: 'She had three eggs.' },
      { id: 2, type: 'recall', prompt: 'Where did Mother Hen finally find her missing egg?', hint: 'Read the second paragraph.', sampleAnswer: 'She found it in a patch of soft grass.' },
      { id: 3, type: 'inference', prompt: 'Why did Mother Hen start checking her nest twice after that day?', hint: 'Think about what she learned from losing the egg.', sampleAnswer: 'She wanted to make sure she never lost an egg again, so she became more careful.' },
      { id: 4, type: 'imagine', prompt: 'If the missing egg could talk, what do you think it would say about its little adventure?', hint: 'Imagine the egg telling its own story!', sampleAnswer: 'Any imaginative, personal answer is great here.' },
    ],
  },

  /* ---------------- Level 2 — Growing Reader ---------------- */
  {
    id: 'ravi_market_day',
    level: 2,
    title: "Ravi's Market Day",
    art: 'ravi_market_day',
    paragraphs: [
      "Every Sunday, Ravi went to the market with his grandmother. The narrow lanes were crowded with baskets of mangoes, marigold flowers, and shiny steel pots.",
      "This week, Grandmother gave Ravi a small list and two coins. \"Can you find the tomatoes yourself?\" she asked with a smile. Ravi felt very proud and a little nervous.",
      "He walked past the flower seller and the toy stall, until he spotted a bright red pile of tomatoes. He paid the seller carefully and counted his change twice, just to be sure.",
      "When he returned, Grandmother checked the bag and grinned. \"You did it all by yourself,\" she said, patting his head. Ravi couldn't stop smiling the whole way home."
    ],
    questions: [
      { id: 1, type: 'recall', prompt: 'Who did Ravi go to the market with?', hint: 'Read the first sentence.', sampleAnswer: 'He went with his grandmother.' },
      { id: 2, type: 'vocabulary', prompt: "The story says Ravi felt 'proud and a little nervous'. What does 'nervous' mean here?", hint: 'Think about doing something new and important for the first time.', sampleAnswer: 'Nervous means a little worried or unsure, like feeling butterflies before trying something new.' },
      { id: 3, type: 'inference', prompt: 'Why did Ravi count his change twice?', hint: 'Think about how careful he wanted to be with the coins.', sampleAnswer: 'He wanted to make sure he got the right amount of change and did the task correctly.' },
      { id: 4, type: 'imagine', prompt: 'If you went to the market alone for the first time, what would you buy and how would you feel?', hint: 'Think about your own feelings and choices.', sampleAnswer: 'Any imaginative, personal answer is great here.' },
    ],
  },
  {
    id: 'squirrel_winter_store',
    level: 2,
    title: "The Squirrel's Winter Store",
    art: 'squirrel_winter_store',
    paragraphs: [
      "As autumn leaves turned gold, Chikki the squirrel began collecting acorns. Her friends played all day in the park, but Chikki kept gathering, one acorn at a time.",
      "\"Why don't you come play with us?\" asked a sparrow. Chikki replied, \"Winter will come soon, and there won't be any food to find. I want to be ready.\"",
      "The other squirrels laughed and continued playing. But when the first snow fell, Chikki's tree hollow was full of acorns, while her friends searched hungrily for food.",
      "Chikki shared her store with her friends that winter. From then on, every squirrel in the park began collecting food before autumn ended."
    ],
    questions: [
      { id: 1, type: 'recall', prompt: 'What was Chikki collecting all autumn?', hint: 'Read the first sentence.', sampleAnswer: 'Chikki was collecting acorns.' },
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
      "Chintu the monkey found the biggest, juiciest mango tree in the jungle. He climbed up quickly and ate mango after mango, without letting anyone else near the tree.",
      "One day, a little bird asked, \"Chintu, may I have just one mango? My babies are hungry.\" Chintu shook his head and swung away with his cheeks full.",
      "Soon, Chintu ate so many mangoes that his tummy ached terribly. He lay under the tree, groaning, while the other animals passed by quietly with their own food.",
      "The little bird, feeling kind despite everything, brought Chintu a leaf full of cool water. Chintu felt very ashamed. From that day, he always shared his mangoes with his jungle friends."
    ],
    questions: [
      { id: 1, type: 'recall', prompt: 'What kind of tree did Chintu find?', hint: 'Read the first sentence.', sampleAnswer: 'He found a mango tree.' },
      { id: 2, type: 'recall', prompt: 'Who brought Chintu water when his tummy ached?', hint: 'Read the last paragraph.', sampleAnswer: 'The little bird brought him water.' },
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
      "A hungry fox spotted a piece of cheese in a crow's beak, high up on a branch. He knew he could never climb the tree, so he thought of a clever plan instead.",
      "\"What a beautiful voice you must have!\" the fox called out sweetly. \"I have heard crows sing wonderfully. Won't you sing for me?\"",
      "Flattered, the crow opened her beak to caw loudly — and the cheese tumbled straight down to the fox. He caught it and trotted away, quite pleased with himself.",
      "The crow felt silly, but she remembered the lesson well: kind words are not always honest ones, and it is wise to think before acting."
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
      "A quick-footed rabbit often teased a slow turtle about his pace. One day, tired of the teasing, the turtle challenged the rabbit to a race across the meadow.",
      "All the animals gathered to watch. The rabbit dashed ahead so fast that he was soon far, far in front. Feeling sure he would win easily, he decided to rest under a shady tree.",
      "While the rabbit napped comfortably, the turtle kept walking, slow and steady, without stopping even once. Step by step, he passed the sleeping rabbit and moved closer to the finish line.",
      "The rabbit woke up with a start and dashed as fast as he could — but it was too late. The turtle had already crossed the line, and every animal cheered for his steady effort."
    ],
    questions: [
      { id: 1, type: 'recall', prompt: 'Who challenged whom to a race?', hint: 'Read the first paragraph.', sampleAnswer: 'The turtle challenged the rabbit to a race.' },
      { id: 2, type: 'recall', prompt: 'Why did the rabbit stop running during the race?', hint: 'Read the second paragraph.', sampleAnswer: 'He felt sure he would win, so he stopped to rest under a tree.' },
      { id: 3, type: 'inference', prompt: 'What lesson does this story teach us?', hint: 'Think about how the turtle won even though he was slow.', sampleAnswer: 'Being steady and never giving up can help you succeed, even if you are not the fastest.' },
      { id: 4, type: 'imagine', prompt: 'If you raced the turtle, what would your plan be to try and win?', hint: 'Think of a smart strategy.', sampleAnswer: 'Any imaginative, personal answer is great here.' },
    ],
  },

  /* ---------------- Level 3 — Bright Explorer ---------------- */
  {
    id: 'starlit_camping',
    level: 3,
    title: 'A Starlit Camping Night',
    art: 'starlit_camping',
    paragraphs: [
      "Meera had never slept outside before, so when her family pitched a bright orange tent in the backyard, her heart fluttered with excitement and just a little worry.",
      "As the sky darkened, thousands of stars appeared, scattered like sugar across black velvet. Her father pointed out a pattern shaped like a giant spoon and called it the Great Bear.",
      "\"Can stars really disappear?\" Meera asked, snuggling into her sleeping bag. Her mother explained that stars are always there, but sunlight during the day is too bright for us to see them.",
      "Meera fell asleep listening to crickets chirping and imagining herself floating among the stars she had just learned about, feeling braver than she had all evening."
    ],
    questions: [
      { id: 1, type: 'recall', prompt: 'What shape did Meera\'s father point out in the sky?', hint: 'Read the second paragraph.', sampleAnswer: 'He pointed out a shape like a giant spoon, called the Great Bear.' },
      { id: 2, type: 'vocabulary', prompt: "The story says the stars were 'scattered like sugar across black velvet'. What is this describing?", hint: 'Think about how the night sky looked to Meera.', sampleAnswer: 'It describes how the many stars were spread out across the dark night sky, like sugar sprinkled on a dark cloth.' },
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
      "Zara and her robot friend Bolt zoomed through the stars in their tiny silver rocket, searching for a planet no one had ever visited before.",
      "\"Look, Bolt!\" Zara pointed at a glowing orange planet with rings like a spinning hula-hoop. \"It looks like it's wearing a necklace made of light.\"",
      "They landed carefully and stepped out in their shiny suits. The ground crunched like crushed biscuits beneath their boots, and strange blue plants swayed gently, even though there was no wind.",
      "Bolt scanned the plants and beeped happily. \"They glow when you're near them,\" he announced. Zara laughed and danced among the glowing plants, lighting up the whole quiet planet like a magical carnival."
    ],
    questions: [
      { id: 1, type: 'recall', prompt: 'What did Zara and Bolt travel in?', hint: 'Read the first sentence.', sampleAnswer: 'They travelled in a tiny silver rocket.' },
      { id: 2, type: 'vocabulary', prompt: "The ground 'crunched like crushed biscuits'. What does this tell you about how the ground felt?", hint: 'Think about the sound and feeling of walking on crushed biscuits.', sampleAnswer: 'It tells us the ground was crumbly and made a crunchy sound when they walked on it.' },
      { id: 3, type: 'inference', prompt: 'Why do you think the blue plants swayed even though there was no wind?', hint: 'This is a mystery in the story — what could be a magical or scientific reason?', sampleAnswer: 'This is left for imagination — perhaps the plants moved on their own, or reacted to Zara and Bolt being near them.' },
      { id: 4, type: 'imagine', prompt: 'Design your own planet! What color is it, and what strange plant or creature lives there?', hint: 'Be as wild and creative as you like.', sampleAnswer: 'Any imaginative, personal answer is great here.' },
    ],
  },
  {
    id: 'garden_of_kindness',
    level: 3,
    title: 'The Garden of Kindness',
    art: 'garden_of_kindness',
    paragraphs: [
      "Old Mr. Fernandes owned the saddest garden on the street — dry soil, drooping leaves, and not a single flower in sight. Children often walked past without a second glance.",
      "One afternoon, a girl named Ayesha noticed him struggling to carry a heavy watering can. Without being asked, she ran over and helped him carry it all the way to the flower beds.",
      "The next day, she returned with two friends, and together they pulled weeds and planted small seeds along the fence. Slowly, over many weeks, more children joined in — some watering, some just keeping Mr. Fernandes company.",
      "By spring, the garden was bursting with colour: marigolds, roses, and tiny sunflowers turning their faces toward the sun. Mr. Fernandes said the garden had never needed better soil — it had simply needed kind hands."
    ],
    questions: [
      { id: 1, type: 'recall', prompt: 'What was the first kind thing Ayesha did for Mr. Fernandes?', hint: 'Read the second paragraph.', sampleAnswer: 'She helped him carry his heavy watering can.' },
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
      "During a season of heavy rain, the river near the forest rose higher and higher, until it flooded the path that all the smaller animals used every day.",
      "The rabbits, mice, and birds gathered nervously at the water's edge, unsure how to reach the other side safely. Even the strongest swimmers among them looked worried by the fast-moving current.",
      "Gentle old Elephant, who lived nearby, waded into the water without a moment's hesitation. He lowered his trunk and back, letting the smaller animals climb aboard, two or three at a time.",
      "Trip after trip, he carried every last animal safely across, until the sun began to set. The animals thanked him with a chorus of chirps, squeaks, and grateful little bows."
    ],
    questions: [
      { id: 1, type: 'recall', prompt: 'Why were the smaller animals unable to cross the river?', hint: 'Read the first two paragraphs.', sampleAnswer: 'The river had flooded and the current was too fast and dangerous for them.' },
      { id: 2, type: 'vocabulary', prompt: "The elephant helped 'without a moment's hesitation'. What does 'hesitation' mean here?", hint: 'Think about how quickly he decided to help.', sampleAnswer: 'Hesitation means pausing or being unsure before doing something — the elephant did not pause at all.' },
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
      "Deep in the forest, when the moon rose high and round, Professor Owl opened her Night School beneath the tallest pine tree, ready to teach anyone curious enough to attend.",
      "\"Tonight,\" she hooted, adjusting her tiny spectacles, \"we shall learn why I can turn my head almost all the way around, while you cannot.\" The young foxes and rabbits leaned in closer, fascinated.",
      "She explained that owls have many more bones in their necks than most animals, which lets them look far behind themselves without moving their whole body — perfect for spotting danger, or dinner, in the dark.",
      "By the end of the lesson, every student was trying their best to twist their necks like the wise professor, giggling and toppling over into the soft pine needles below."
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
      "Buddy the dog loved his sunny yard, but lately, he felt a little lonely — his best friend, a boy named Arjun, had moved to a different street across town.",
      "One afternoon, a small black cat crept along the fence, looking just as lonely as Buddy felt. Instead of barking, Buddy sat down quietly and let out a soft, friendly whine.",
      "The cat, surprised by his gentleness, crept closer and finally sat beside him in the warm sunlight. Neither of them said a word, but somehow, they understood each other perfectly.",
      "From that day on, the unlikely pair met by the fence every afternoon. Buddy still missed Arjun, but his heart felt a little lighter, knowing he had found a new friend after all."
    ],
    questions: [
      { id: 1, type: 'recall', prompt: 'Why did Buddy feel lonely at the start of the story?', hint: 'Read the first paragraph.', sampleAnswer: 'His best friend Arjun had moved to a different street.' },
      { id: 2, type: 'inference', prompt: 'Why do you think Buddy chose to whine softly instead of barking at the cat?', hint: 'Think about how he wanted the cat to feel.', sampleAnswer: 'He probably wanted to seem friendly and gentle instead of scaring the cat away.' },
      { id: 3, type: 'inference', prompt: "What does the story mean by saying Buddy's heart 'felt a little lighter'?", hint: 'Think about his feelings by the end of the story.', sampleAnswer: 'It means he felt happier and less sad, even though he still missed his old friend.' },
      { id: 4, type: 'imagine', prompt: 'Write about a time you felt lonely and something (or someone) that made you feel better.', hint: 'This can be a real memory or an imagined one.', sampleAnswer: 'Any imaginative, personal answer is great here.' },
    ],
  },
];

window.ReadingQuestStories = STORIES;
