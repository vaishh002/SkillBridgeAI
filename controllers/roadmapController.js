const User = require('../models/User');

// Curated library of skills and style-specific resources
const SKILL_LIBRARY = {
  'HTML & CSS': {
    Video: [
      { title: 'HTML & CSS Crash Course for Beginners', type: 'video', url: 'https://www.youtube.com/watch?v=Dp8M9q6Fm2I' },
      { title: 'Learn CSS Flexbox and Grid Visualized', type: 'video', url: 'https://www.youtube.com/watch?v=3YW62O-V1aU' }
    ],
    Reading: [
      { title: 'MDN Web Docs: Learn HTML', type: 'doc', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML' },
      { title: 'CSS-Tricks: A Complete Guide to Flexbox', type: 'doc', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' }
    ],
    Practical: [
      { title: 'Build a Responsive Portfolio Webpage', type: 'practice', url: 'https://github.com/florinpop17/app-ideas' },
      { title: 'Interactive CSS Grid Garden Game', type: 'practice', url: 'https://cssgridgarden.com/' }
    ]
  },
  'JavaScript': {
    Video: [
      { title: 'JavaScript Full Course for Beginners', type: 'video', url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg' },
      { title: 'Asynchronous JavaScript & Promises', type: 'video', url: 'https://www.youtube.com/watch?v=exBgWAIeIeg' }
    ],
    Reading: [
      { title: 'JavaScript.info: Modern JS Tutorial', type: 'doc', url: 'https://javascript.info/' },
      { title: 'MDN Web Docs: JavaScript Guide', type: 'doc', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' }
    ],
    Practical: [
      { title: '30 Days of JavaScript Coding Challenges', type: 'practice', url: 'https://github.com/Asabeneh/30-Days-Of-JavaScript' },
      { title: 'Build a Calculator App with Vanilla JS', type: 'practice', url: 'https://github.com/florinpop17/app-ideas' }
    ]
  },
  'React.js': {
    Video: [
      { title: 'React JS Full Beginner Course (2026)', type: 'video', url: 'https://www.youtube.com/watch?v=bMknfKXIFA8' },
      { title: 'React Hooks Explained (useState, useEffect)', type: 'video', url: 'https://www.youtube.com/watch?v=TNhaISOUy6g' }
    ],
    Reading: [
      { title: 'Official React Documentation (New Docs)', type: 'doc', url: 'https://react.dev/' },
      { title: 'React Handbook: Visual Guide', type: 'doc', url: 'https://www.freecodecamp.org/news/react-handbook/' }
    ],
    Practical: [
      { title: 'Create a Todo List & Weather App in React', type: 'practice', url: 'https://github.com/florinpop17/app-ideas' },
      { title: 'React Coding Exercises on Scrimba', type: 'practice', url: 'https://scrimba.com/learn/learnreact' }
    ]
  },
  'Tailwind CSS': {
    Video: [
      { title: 'Tailwind CSS Course - Rapid UI Design', type: 'video', url: 'https://www.youtube.com/watch?v=lCxcTsOHr54' },
      { title: 'Build a Modern landing page with Tailwind', type: 'video', url: 'https://www.youtube.com/watch?v=dFgzHOX84xQ' }
    ],
    Reading: [
      { title: 'Tailwind CSS Official Documentation', type: 'doc', url: 'https://tailwindcss.com/docs' },
      { title: 'Tailwind Cheat Sheet Guide', type: 'doc', url: 'https://nerdcave.com/tailwind-cheat-sheet' }
    ],
    Practical: [
      { title: 'Recreate Tailwind Dashboard Mockup', type: 'practice', url: 'https://github.com/tailwindtoolbox' },
      { title: 'Interactive Tailwind Play Sandbox', type: 'practice', url: 'https://play.tailwindcss.com/' }
    ]
  },
  'TypeScript': {
    Video: [
      { title: 'TypeScript Full Tutorial for Beginners', type: 'video', url: 'https://www.youtube.com/watch?v=d56mG7DezGs' },
      { title: 'TypeScript Design Patterns', type: 'video', url: 'https://www.youtube.com/watch?v=qvZz86J1jZk' }
    ],
    Reading: [
      { title: 'TypeScript Official Handbook', type: 'doc', url: 'https://www.typescriptlang.org/docs/handbook/intro.html' },
      { title: 'TypeScript Deep Dive E-Book', type: 'doc', url: 'https://basarat.gitbook.io/typescript/' }
    ],
    Practical: [
      { title: 'Refactor a React App to TypeScript', type: 'practice', url: 'https://github.com/typescript-cheatsheets/react' },
      { title: 'TypeScript Exercism Practice Track', type: 'practice', url: 'https://exercism.org/tracks/typescript' }
    ]
  },
  'Node.js & Express': {
    Video: [
      { title: 'Node.js and Express.js - Full Course', type: 'video', url: 'https://www.youtube.com/watch?v=Oe421EPjeBE' },
      { title: 'Build a REST API with Node & Express', type: 'video', url: 'https://www.youtube.com/watch?v=pKd0Rpw7O40' }
    ],
    Reading: [
      { title: 'Node.js Official Documentation', type: 'doc', url: 'https://nodejs.org/en/docs/' },
      { title: 'Express.js Guide and Routing Docs', type: 'doc', url: 'https://expressjs.com/en/guide/routing.html' }
    ],
    Practical: [
      { title: 'Build a Command-Line File Manager in Node', type: 'practice', url: 'https://github.com/florinpop17/app-ideas' },
      { title: 'Interactive Node.js Workshopper Labs', type: 'practice', url: 'https://nodeschool.io/' }
    ]
  },
  'Databases & SQL': {
    Video: [
      { title: 'SQL & Relational Databases Crash Course', type: 'video', url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY' },
      { title: 'MongoDB Full Course for Beginners', type: 'video', url: 'https://www.youtube.com/watch?v=c2M-rlkkT5o' }
    ],
    Reading: [
      { title: 'SQL Tutorial - W3Schools Reference', type: 'doc', url: 'https://www.w3schools.com/sql/' },
      { title: 'Mongoose Schemas and Models Guide', type: 'doc', url: 'https://mongoosejs.com/docs/guide.html' }
    ],
    Practical: [
      { title: 'SQLbolt - Interactive SQL Queries', type: 'practice', url: 'https://sqlbolt.com/' },
      { title: 'Build a database model diagram and seeds', type: 'practice', url: 'https://dbdiagram.io/' }
    ]
  },
  'Docker': {
    Video: [
      { title: 'Docker Tutorial for Beginners (Containerization)', type: 'video', url: 'https://www.youtube.com/watch?v=3c-iKanqeCo' },
      { title: 'Docker Compose and Multi-container Deploy', type: 'video', url: 'https://www.youtube.com/watch?v=DM65_YeXcnY' }
    ],
    Reading: [
      { title: 'Docker Official Get Started Documentation', type: 'doc', url: 'https://docs.docker.com/get-started/' },
      { title: 'Docker Cheat Sheet for Developers', type: 'doc', url: 'https://github.com/wsargent/docker-cheat-sheet' }
    ],
    Practical: [
      { title: 'Dockerize a React + Node Web App', type: 'practice', url: 'https://github.com/docker/labs' },
      { title: 'Interactive Play with Docker Sandbox', type: 'practice', url: 'https://labs.play-with-docker.com/' }
    ]
  },
  'Kubernetes': {
    Video: [
      { title: 'Kubernetes Tutorial for Beginners [Full Course]', type: 'video', url: 'https://www.youtube.com/watch?v=X48VuDVv0do' },
      { title: 'Kubernetes Architecture & Core Concepts', type: 'video', url: 'https://www.youtube.com/watch?v=VnvRFRk_51k' }
    ],
    Reading: [
      { title: 'Kubernetes Official Documentation Tutorials', type: 'doc', url: 'https://kubernetes.io/docs/tutorials/' },
      { title: 'Interactive Kubernetes Handbook (K8s)', type: 'doc', url: 'https://www.aquasec.com/wiki/display/CONTAINER/Kubernetes+Architecture' }
    ],
    Practical: [
      { title: 'Deploy a Node Web App using Minikube locally', type: 'practice', url: 'https://minikube.sigs.k8s.io/docs/start/' },
      { title: 'Interactive Play with Kubernetes Labs', type: 'practice', url: 'https://labs.play-with-k8s.com/' }
    ]
  },
  'AWS & Cloud Computing': {
    Video: [
      { title: 'AWS Certified Cloud Practitioner Course', type: 'video', url: 'https://www.youtube.com/watch?v=SOTamWGuDKc' },
      { title: 'AWS EC2, S3, and RDS in 1 Hour', type: 'video', url: 'https://www.youtube.com/watch?v=3hLmDS179YE' }
    ],
    Reading: [
      { title: 'AWS Getting Started Resource Library', type: 'doc', url: 'https://aws.amazon.com/getting-started/' },
      { title: 'Cloud Computing Guide for Developers', type: 'doc', url: 'https://roadmap.sh/devops' }
    ],
    Practical: [
      { title: 'Deploy an Express App to AWS Elastic Beanstalk', type: 'practice', url: 'https://aws.amazon.com/getting-started/hands-on/' },
      { title: 'Deploy a Static Website on AWS S3 with CDN', type: 'practice', url: 'https://github.com/donnemartin/system-design-primer' }
    ]
  },
  'Git & Version Control': {
    Video: [
      { title: 'Git & GitHub Crash Course for Beginners', type: 'video', url: 'https://www.youtube.com/watch?v=RGOj5yH7evk' },
      { title: 'Advanced Git: Merge vs Rebase vs Cherry-pick', type: 'video', url: 'https://www.youtube.com/watch?v=ecK3-S5IFac' }
    ],
    Reading: [
      { title: 'Pro Git Book (Official Free E-Book)', type: 'doc', url: 'https://git-scm.com/book/en/v2' },
      { title: 'GitHub Guides: Git Handbook', type: 'doc', url: 'https://guides.github.com/introduction/git-handbook/' }
    ],
    Practical: [
      { title: 'Learn Git Branching Interactively', type: 'practice', url: 'https://learngitbranching.js.org/' },
      { title: 'Collaborate on a Git Pull Request sandbox', type: 'practice', url: 'https://github.com/firstcontributions/first-contributions' }
    ]
  },
  'CI/CD & Jenkins': {
    Video: [
      { title: 'DevOps CI/CD Pipeline Tutorial with GitHub Actions', type: 'video', url: 'https://www.youtube.com/watch?v=R8_veQiYt6E' },
      { title: 'Jenkins Tutorial for Beginners (CI/CD)', type: 'video', url: 'https://www.youtube.com/watch?v=LFDrDnKP_gM' }
    ],
    Reading: [
      { title: 'GitHub Actions Official Documentation', type: 'doc', url: 'https://docs.github.com/en/actions' },
      { title: 'Jenkins User Documentation & Pipelines', type: 'doc', url: 'https://www.jenkins.io/doc/' }
    ],
    Practical: [
      { title: 'Build a GitHub Action to Run ESLint and Jest Tests', type: 'practice', url: 'https://github.com/sdras/awesome-actions' },
      { title: 'Configure a pipeline triggered on repo push', type: 'practice', url: 'https://exercism.org' }
    ]
  },
  'Python Data Analysis': {
    Video: [
      { title: 'Python for Data Analysis - NumPy, Pandas', type: 'video', url: 'https://www.youtube.com/watch?v=GPVsHOlZsBI' },
      { title: 'Data Visualization in Python with Seaborn', type: 'video', url: 'https://www.youtube.com/watch?v=6GUZZFGax1g' }
    ],
    Reading: [
      { title: 'Pandas Official Getting Started Tutorials', type: 'doc', url: 'https://pandas.pydata.org/docs/getting_started/index.html' },
      { title: 'Python Data Science Handbook', type: 'doc', url: 'https://jakevdp.github.io/PythonDataScienceHandbook/' }
    ],
    Practical: [
      { title: 'Analyze Titanic Passenger Dataset on Kaggle', type: 'practice', url: 'https://www.kaggle.com/c/titanic' },
      { title: 'Jupyter Notebook Data Analysis Sandbox', type: 'practice', url: 'https://jupyter.org/try' }
    ]
  },
  'Machine Learning': {
    Video: [
      { title: 'Machine Learning Course for Beginners (Scikit-Learn)', type: 'video', url: 'https://www.youtube.com/watch?v=GwIo3gG3Ju0' },
      { title: 'Deep Learning & Neural Networks Explained', type: 'video', url: 'https://www.youtube.com/watch?v=aircAruvnKk' }
    ],
    Reading: [
      { title: 'Scikit-Learn Getting Started Tutorials', type: 'doc', url: 'https://scikit-learn.org/stable/getting_started.html' },
      { title: 'Rules of Machine Learning: Best Practices', type: 'doc', url: 'https://developers.google.com/machine-learning/guides/rules-of-ml' }
    ],
    Practical: [
      { title: 'Train a classifier for hand-written digits', type: 'practice', url: 'https://github.com/ageron/handson-ml3' },
      { title: 'Interactive TensorFlow Playground', type: 'practice', url: 'https://playground.tensorflow.org/' }
    ]
  }
};

const DEFAULT_ROLE_SKILLS = {
  'Frontend Developer': ['HTML & CSS', 'JavaScript', 'React.js', 'Tailwind CSS', 'TypeScript', 'Git & Version Control'],
  'Backend Developer': ['JavaScript', 'Node.js & Express', 'Databases & SQL', 'Docker', 'AWS & Cloud Computing', 'Git & Version Control'],
  'Full Stack Engineer': ['HTML & CSS', 'JavaScript', 'React.js', 'Node.js & Express', 'Databases & SQL', 'Docker', 'Git & Version Control'],
  'DevOps Engineer': ['Git & Version Control', 'Docker', 'Kubernetes', 'AWS & Cloud Computing', 'CI/CD & Jenkins'],
  'Data Scientist': ['JavaScript', 'Databases & SQL', 'Python Data Analysis', 'Machine Learning', 'Git & Version Control']
};

// @route   POST /api/roadmap/preferences
// @desc    Save learning preferences
// @access  Private
const savePreferences = async (req, res) => {
  try {
    const { targetRole, learningStyle, weeklyHours } = req.body;

    if (!targetRole || !learningStyle || !weeklyHours) {
      return res.status(400).json({ success: false, message: 'All preference fields are required.' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    user.targetRole = targetRole;
    user.learningStyle = learningStyle;
    user.weeklyHours = Number(weeklyHours);

    // Auto-generate roadmap if they don't have one yet, or they changed their target role
    const defaultSkills = DEFAULT_ROLE_SKILLS[targetRole] || DEFAULT_ROLE_SKILLS['Frontend Developer'];
    
    // Map skills to their selected learning style
    user.roadmap = defaultSkills.map(skill => {
      const resourcesForSkill = SKILL_LIBRARY[skill] ? SKILL_LIBRARY[skill][learningStyle] : [];
      return {
        skillName: skill,
        status: 'not_started',
        resources: resourcesForSkill
      };
    });

    user.careerReadinessScore = 0;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Preferences saved and roadmap generated successfully!',
      user
    });
  } catch (error) {
    console.error('Error saving preferences:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @route   POST /api/roadmap/generate
// @desc    Trigger learning path generation based on custom skill gaps
// @access  Private
const generateRoadmap = async (req, res) => {
  try {
    const { missingSkills, targetRole } = req.body;
    
    if (!missingSkills || !Array.isArray(missingSkills)) {
      return res.status(400).json({ success: false, message: 'Please provide missing skills array.' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const selectedStyle = user.learningStyle || 'Video';
    if (targetRole) {
      user.targetRole = targetRole;
    }

    // Merge standard role skills with analyzed missing skills
    const baseSkills = DEFAULT_ROLE_SKILLS[user.targetRole || 'Frontend Developer'] || [];
    const uniqueSkillsSet = new Set([...missingSkills, ...baseSkills]);
    
    // Re-verify that skills are in the library, otherwise map to default
    user.roadmap = Array.from(uniqueSkillsSet).map(skillName => {
      // Find matches in library, fallback if they scanned a custom name
      let mappedName = skillName;
      if (!SKILL_LIBRARY[mappedName]) {
        // Simple mapping rules
        if (mappedName.toLowerCase().includes('react')) mappedName = 'React.js';
        else if (mappedName.toLowerCase().includes('node') || mappedName.toLowerCase().includes('express')) mappedName = 'Node.js & Express';
        else if (mappedName.toLowerCase().includes('css') || mappedName.toLowerCase().includes('html')) mappedName = 'HTML & CSS';
        else if (mappedName.toLowerCase().includes('ts') || mappedName.toLowerCase().includes('typescript')) mappedName = 'TypeScript';
        else if (mappedName.toLowerCase().includes('docker')) mappedName = 'Docker';
        else if (mappedName.toLowerCase().includes('k8s') || mappedName.toLowerCase().includes('kubernetes')) mappedName = 'Kubernetes';
        else if (mappedName.toLowerCase().includes('sql') || mappedName.toLowerCase().includes('database') || mappedName.toLowerCase().includes('mongo')) mappedName = 'Databases & SQL';
        else if (mappedName.toLowerCase().includes('aws') || mappedName.toLowerCase().includes('cloud')) mappedName = 'AWS & Cloud Computing';
        else if (mappedName.toLowerCase().includes('git') || mappedName.toLowerCase().includes('version')) mappedName = 'Git & Version Control';
        else if (mappedName.toLowerCase().includes('python') || mappedName.toLowerCase().includes('pandas')) mappedName = 'Python Data Analysis';
        else if (mappedName.toLowerCase().includes('machine') || mappedName.toLowerCase().includes('ml')) mappedName = 'Machine Learning';
        else mappedName = 'JavaScript'; // default fallback
      }

      const resources = SKILL_LIBRARY[mappedName] ? SKILL_LIBRARY[mappedName][selectedStyle] : SKILL_LIBRARY['JavaScript'][selectedStyle];
      return {
        skillName: mappedName,
        status: 'not_started',
        resources: resources
      };
    });

    user.careerReadinessScore = 0;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Personalized roadmap created from analyzed gaps!',
      user
    });
  } catch (error) {
    console.error('Error generating roadmap:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @route   GET /api/roadmap
// @desc    Get current user's roadmap
// @access  Private
const getRoadmap = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    return res.status(200).json({
      success: true,
      preferences: {
        targetRole: user.targetRole,
        learningStyle: user.learningStyle,
        weeklyHours: user.weeklyHours,
        careerReadinessScore: user.careerReadinessScore
      },
      roadmap: user.roadmap || []
    });
  } catch (error) {
    console.error('Error fetching roadmap:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @route   PATCH /api/roadmap/items/:itemId
// @desc    Update status of a roadmap task node
// @access  Private
const toggleItemStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { itemId } = req.params;

    if (!['not_started', 'in_progress', 'completed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value.' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const roadmapItem = user.roadmap.id(itemId);
    if (!roadmapItem) {
      return res.status(404).json({ success: false, message: 'Roadmap node not found.' });
    }

    roadmapItem.status = status;
    roadmapItem.completedAt = status === 'completed' ? new Date() : null;

    // Recalculate career readiness score: percent of completed skills
    const completedCount = user.roadmap.filter(item => item.status === 'completed').length;
    const totalCount = user.roadmap.length;
    user.careerReadinessScore = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Node status updated!',
      roadmap: user.roadmap,
      careerReadinessScore: user.careerReadinessScore
    });
  } catch (error) {
    console.error('Error updating roadmap item:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  savePreferences,
  generateRoadmap,
  getRoadmap,
  toggleItemStatus
};
