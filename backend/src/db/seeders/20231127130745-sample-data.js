const db = require('../models');
const Users = db.users;

const Projects = db.projects;

const Tasks = db.tasks;

const ProjectsData = [
  {
    name: 'Enrico Fermi',

    description: 'Hans Bethe',

    // type code here for "relation_one" field
  },

  {
    name: 'Isaac Newton',

    description: 'Francis Crick',

    // type code here for "relation_one" field
  },

  {
    name: 'Emil Kraepelin',

    description: 'William Herschel',

    // type code here for "relation_one" field
  },
];

const TasksData = [
  {
    title: 'Isaac Newton',

    description: 'Charles Darwin',

    status: 'ToDo',

    start_date: new Date(),

    end_date: new Date(),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    title: 'Murray Gell-Mann',

    description: 'Carl Linnaeus',

    status: 'InProgress',

    start_date: new Date(),

    end_date: new Date(),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    title: 'Carl Gauss (Karl Friedrich Gauss)',

    description: 'Pierre Simon de Laplace',

    status: 'InProgress',

    start_date: new Date(),

    end_date: new Date(),

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

// Similar logic for "relation_many"

async function associateProjectWithOwner() {
  const relatedOwner0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Project0 = await Projects.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Project0?.setOwner) {
    await Project0.setOwner(relatedOwner0);
  }

  const relatedOwner1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Project1 = await Projects.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Project1?.setOwner) {
    await Project1.setOwner(relatedOwner1);
  }

  const relatedOwner2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Project2 = await Projects.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Project2?.setOwner) {
    await Project2.setOwner(relatedOwner2);
  }
}

async function associateTaskWithProject() {
  const relatedProject0 = await Projects.findOne({
    offset: Math.floor(Math.random() * (await Projects.count())),
  });
  const Task0 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Task0?.setProject) {
    await Task0.setProject(relatedProject0);
  }

  const relatedProject1 = await Projects.findOne({
    offset: Math.floor(Math.random() * (await Projects.count())),
  });
  const Task1 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Task1?.setProject) {
    await Task1.setProject(relatedProject1);
  }

  const relatedProject2 = await Projects.findOne({
    offset: Math.floor(Math.random() * (await Projects.count())),
  });
  const Task2 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Task2?.setProject) {
    await Task2.setProject(relatedProject2);
  }
}

async function associateTaskWithAssignee() {
  const relatedAssignee0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Task0 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Task0?.setAssignee) {
    await Task0.setAssignee(relatedAssignee0);
  }

  const relatedAssignee1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Task1 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Task1?.setAssignee) {
    await Task1.setAssignee(relatedAssignee1);
  }

  const relatedAssignee2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Task2 = await Tasks.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Task2?.setAssignee) {
    await Task2.setAssignee(relatedAssignee2);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Projects.bulkCreate(ProjectsData);

    await Tasks.bulkCreate(TasksData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateProjectWithOwner(),

      await associateTaskWithProject(),

      await associateTaskWithAssignee(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('projects', null, {});

    await queryInterface.bulkDelete('tasks', null, {});
  },
};
