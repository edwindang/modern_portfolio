export const projects = [
  {
      title: "CrateAI",
      description: "Designed and built a computer vision system to automate package verification in a warehouse loading environment. The system leverages a 3-model architecture:" + 
        "a YOLO-based crate detection model, meta's SAM2 mode, and a classification model to identify packages." +
        "The pipeline processes real-time video inputs, enabling accurate package counts and package-type validation per crate.",
      image: "/Warehouse.jpg",
      tags: ["Machine Vision", "AI/ML Infrastructure", "Python", "AI training & Inference"],
      source: "https://github.com/edwindang/AI_package_detector.git",
      visit: "",
      id: 0,
  },
  {
    title:
      "TicTacToe AI",
    description:
      "Built an adversarial state-space search game with a minimax heuristic, alpha-beta pruning, and a fixed depth cutoff. \
    Algorithms were implemented via a game of Tic-Tac-Toe, in which a user can play with the programmed AI computer opponent.",
    image:
      "/tictactoe.jpeg",
    tags: ["Java"],
    source: "https://github.com/edwindang/AI_games",
    visit: "https://ai-tictactoe-beta.vercel.app/",
    id: 1,
  },  
  {
      title: "TrackTap",
      description:
        "Built a web application that allows groups to collaboratively control a shared music playlist, enabling users to upvote \
      and downvote songs in the queue for a dynamic, crowd-driven listening experience.",
      image: "/tracktap.jpeg",
      tags: ["JavaScript", "Python", "C++", "HTML", "CSS"],
      source: "https://github.com/edwindang/TrackTap",
      visit: "https://tracktap.app/home",
      id: 2,
    },
    {
      title: "Building and Training Linear Classifiers and Neural Networks",
      description:
        "Implement linear classifiers and a neural network to feed \
      training data into. Program reads training data and outputs a decision boundary for classification purposes.",
      image: "/neuralnet.jpeg",
      tags: ["Java", "gnuplot"],
      source: "https://github.com/edwindang/linearClassifier/tree/master",
      visit: "",
      id: 3,
    },
    {
      title:
        "Quantifying Compensatory Movements in Individuals with Post-stroke Hemiparesis",
      description:
        "Built a program (Python) with Pandas and SciPy to quantify compensatory chest movement by analyzing gyroscopic data collected from healthy \
      and affected subjects doing stroke rehabilitation functional. Presented results at a poster conference for the American Society of Neurorehabilitation (ASNR).",
      image: "/compensatory.jpeg",
      tags: ["Python", "Pandas", "SciPy", "Numpy", "MatPlotLib"],
      source: "https://github.com/edwindang/compensatory_movements",
      visit: "https://drive.google.com/file/d/1_cWsapwA5iAg0kKfF1V-43ugEZToOlS_/view?usp=sharing",
      id: 4,
    },
    {
      title:
        "this.website",
      description:
        "My personal portfolio website code",
      image: "/website.jpg",
      tags: ["Next.js", "TailWindCSS", "Typescript"],
      source: "https://github.com/edwindang/modern_portfolio.git",
      visit: "https://modern-portfolio-sable.vercel.app/",
      id: 5,
    },
    /*
    {
      title: "Algorithmic Stock Trading Program",
      description:
        "Built a stock trading program that reads previous market data for any given company over any specified time period from the past. \
      The algorithm makes trades as each market day is processed based on a moving average algorithm, RSI algorithm, and recession trigger algorithm to give \
      monetary results at the end of the specified time period.",
      image: "/images/stocks.jpeg",
      tags: ["Python"],
      source: "https://github.com/edwindang/stock_trading/tree/master",
      visit: "https://google.com",
      id: 3,
    },
    */
  ];