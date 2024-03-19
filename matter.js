const matterContainer = document.querySelector("#matter-container");
const THICCNESS = 60;
let scaleFactor = matterContainer.clientWidth / 1366;
let initialHeight;

if (viewportWidth < 480) {
  initialHeight = matterContainer.clientHeight * 1.0;
} else if (viewportWidth < 992) {
  initialHeight = matterContainer.clientHeight * 0.95;
} else {
  initialHeight = matterContainer.clientHeight;
}

/** Set up relative positions and scales **/
var VIEW = {};
VIEW.width = window.innerWidth;
VIEW.height = window.innerHeight;
VIEW.centerX = VIEW.width / 2;
VIEW.centerY = VIEW.height / 2;
VIEW.offsetX = VIEW.width / 2;
VIEW.offsetY = VIEW.height / 2;

// Matter.js module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Common = Matter.Common,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body,
  Events = Matter.Events,
  Query = Matter.Query,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Composite = Matter.Composite,
  Composites = Matter.Composites,
  Svg = Matter.Svg,
  Vertices = Matter.Vertices;

// create an engine
var engine = Engine.create();
world = engine.world;
engine.gravity.y = 0;

// create a renderer
var render = Render.create({
  element: matterContainer,
  engine: engine,
  options: {
    width: window.innerWidth,
    height: initialHeight,
    background: "transparent",
    wireframes: false,
    showAngleIndicator: false,
    showBroadphase: false,
    showBounds: false,
    // background: "transparent",
    // wireframes: true,
    // showAngleIndicator: false,
    // showBroadphase: true,
    // showBounds: true,
  },
});

var blueRadiusArray;
if (viewportWidth < 480) {
  blueRadiusArray = [75, 75, 0, 0];
} else if (viewportWidth < 768) {
  blueRadiusArray = [110, 110, 0, 0];
} else {
  blueRadiusArray = [187, 187, 0, 0];
}

var yellowRadiusArray;
if (viewportWidth < 480) {
  yellowRadiusArray = [30, 0, 0, 30];
} else if (viewportWidth < 768) {
  yellowRadiusArray = [50, 0, 0, 50];
} else {
  yellowRadiusArray = [80, 0, 0, 80];
}

var pillRadiusArray;
if (viewportWidth < 480) {
  pillRadiusArray = [30, 30, 30, 30];
} else if (viewportWidth < 768) {
  pillRadiusArray = [50, 50, 50, 50];
} else {
  pillRadiusArray = [80, 80, 80, 80];
}

var quartCircleRadiusArray;
if (viewportWidth < 480) {
  quartCircleRadiusArray = [0, 45, 0, 0];
} else if (viewportWidth < 768) {
  quartCircleRadiusArray = [0, 80, 0, 0];
} else {
  quartCircleRadiusArray = [0, 130, 0, 0];
}

var redRadiusArray;
if (viewportWidth < 480) {
  redRadiusArray = [0, 0, 75, 75];
} else if (viewportWidth < 768) {
  redRadiusArray = [0, 0, 110, 110];
} else {
  redRadiusArray = [0, 0, 187, 187];
}

var bodiesDom = document.querySelectorAll(".matter-elements");
var bodies = [];
var disturbers = [];

for (var i = 0, l = bodiesDom.length; i < l; i++) {
  if (bodiesDom[i].classList.contains("square")) {
    // Strip
    var body = Bodies.rectangle(
      VIEW.centerX +
        Math.floor((Math.random() * VIEW.width) / 2) -
        VIEW.width / 4,
      0,
      (VIEW.width * bodiesDom[i].offsetWidth) / window.innerWidth,
      (VIEW.height * bodiesDom[i].offsetHeight) / window.innerHeight,
      {
        restitution: 0.6,
        friction: 0.3,
        frictionAir: 0.001,
        frictionStatic: 0,
        density: 1,
        render: {
          fillStyle: "transparent",
        },
        angle: Math.random() * 2.0 - 1.0,
      },
    );
  } else if (bodiesDom[i].classList.contains("blue-circle")) {
    var body = Bodies.rectangle(
      VIEW.centerX +
        Math.floor((Math.random() * VIEW.width) / 2) -
        VIEW.width / 4,
      0,
      (VIEW.width * bodiesDom[i].offsetWidth) / window.innerWidth,
      (VIEW.height * bodiesDom[i].offsetHeight) / window.innerHeight,
      {
        restitution: 0.6,
        friction: 0.3,
        frictionAir: 0.001,
        frictionStatic: 0,
        density: 1,
        chamfer: {
          radius: blueRadiusArray,
        },
        render: {
          fillStyle: "transparent",
        },
        angle: Math.random() * 2.0 - 1.0,
      },
    );
  } else if (bodiesDom[i].classList.contains("red-circle")) {
    var body = Bodies.rectangle(
      VIEW.centerX +
        Math.floor((Math.random() * VIEW.width) / 2) -
        VIEW.width / 4,
      0,
      (VIEW.width * bodiesDom[i].offsetWidth) / window.innerWidth,
      (VIEW.height * bodiesDom[i].offsetHeight) / window.innerHeight,
      {
        restitution: 0.6,
        friction: 0.3,
        frictionAir: 0.001,
        frictionStatic: 0,
        density: 1,
        chamfer: {
          radius: redRadiusArray,
        },
        render: {
          fillStyle: "transparent",
        },
        angle: Math.random() * 2.0 - 1.0,
      },
    );
  } else if (bodiesDom[i].classList.contains("is-yellow")) {
    var body = Bodies.rectangle(
      VIEW.centerX +
        Math.floor((Math.random() * VIEW.width) / 2) -
        VIEW.width / 4,
      0,
      (VIEW.width * bodiesDom[i].offsetWidth) / window.innerWidth,
      (VIEW.height * bodiesDom[i].offsetHeight) / window.innerHeight,
      {
        restitution: 0.6,
        friction: 0.3,
        frictionAir: 0.001,
        frictionStatic: 0,
        density: 1,
        chamfer: {
          radius: yellowRadiusArray,
        },
        render: {
          fillStyle: "transparent",
        },
        angle: Math.random() * 2.0 - 1.0,
      },
    );
  } else if (bodiesDom[i].classList.contains("is-pill")) {
    var body = Bodies.rectangle(
      VIEW.centerX +
        Math.floor((Math.random() * VIEW.width) / 2) -
        VIEW.width / 4,
      0,
      (VIEW.width * bodiesDom[i].offsetWidth) / window.innerWidth,
      (VIEW.height * bodiesDom[i].offsetHeight) / window.innerHeight,
      {
        restitution: 0.6,
        friction: 0.3,
        frictionAir: 0.001,
        frictionStatic: 0,
        density: 1,
        chamfer: {
          radius: pillRadiusArray,
        },
        render: {
          fillStyle: "transparent",
        },
        angle: Math.random() * 2.0 - 1.0,
      },
    );
  } else if (bodiesDom[i].classList.contains("is-quart-circle")) {
    var body = Bodies.rectangle(
      VIEW.centerX +
        Math.floor((Math.random() * VIEW.width) / 2) -
        VIEW.width / 4,
      0,
      (VIEW.width * bodiesDom[i].offsetWidth) / window.innerWidth,
      (VIEW.height * bodiesDom[i].offsetHeight) / window.innerHeight,
      {
        restitution: 0.6,
        friction: 0.3,
        frictionAir: 0.001,
        frictionStatic: 0,
        density: 1,
        chamfer: {
          radius: quartCircleRadiusArray,
        },
        render: {
          fillStyle: "transparent",
        },
        angle: Math.random() * 2.0 - 1.0,
      },
    );
  }
  bodiesDom[i].id = body.id;
  bodies.push(body);
}

World.add(engine.world, bodies);

let circleRed = Bodies.circle(
  VIEW.centerX + Math.floor((Math.random() * VIEW.width) / 2) - VIEW.width / 4,
  0,
  40,
  {
    friction: 0.1,
    frictionAir: 0.00001,
    restitution: 0.6,
    render: {
      fillStyle: "#EB223B",
    },
  },
);

Composite.add(engine.world, circleRed);

let circleWhite = Bodies.circle(
  VIEW.centerX + Math.floor((Math.random() * VIEW.width) / 2) - VIEW.width / 4,
  0,
  30,
  {
    friction: 0.1,
    frictionAir: 0.00001,
    restitution: 0.6,
    render: {
      fillStyle: "#fff",
    },
  },
);

Composite.add(engine.world, circleWhite);

var select = function (root, selector) {
  return Array.prototype.slice.call(root.querySelectorAll(selector));
};

var loadSvg = function (url) {
  return fetch(url)
    .then(function (response) {
      return response.text();
    })
    .then(function (raw) {
      return new window.DOMParser().parseFromString(raw, "image/svg+xml");
    });
};

loadSvg(
  "https://uploads-ssl.webflow.com/655db763c5d312c245e660e4/65d63a123496cd16502c53c0_GROUND.svg",
).then(function (root) {
  var paths = select(root, "path");

  var vertexSets = paths.map(function (path) {
    return Svg.pathToVertices(path, 30);
  });

  vertexSets = vertexSets.map(function (vertices) {
    return Vertices.scale(vertices, scaleFactor, scaleFactor);
  });

  let groundY;
  if (viewportWidth < 480) {
    groundY = 1.06;
  } else if (viewportWidth < 769) {
    groundY = 1.15;
  } else {
    groundY = 1.195;
  }

  var terrain = Bodies.fromVertices(
    matterContainer.clientWidth / 2,
    initialHeight / groundY,
    vertexSets,
    {
      isStatic: true,
      render: {
        fillStyle: "#F0E7E0",
        strokeStyle: "#F0E7E0",
        lineWidth: 1,
      },
    },
    true,
  );

  Composite.add(world, terrain);
});

function scaleBodies() {
  const allBodies = Composite.allBodies(engine.world);

  allBodies.forEach((body) => {
    const { min, max } = body.bounds;
    const bodyWidth = max.x - min.x;
    // let scaleFactor = 1 / bodyWidth;
    const scaleFactor = initialHeight / matterContainer.clientHeight;
    Body.scale(body, scaleFactor, scaleFactor);
  });
}

let leftWall = Bodies.rectangle(
  0 - THICCNESS / 2,
  matterContainer.clientHeight / 2,
  THICCNESS,
  matterContainer.clientHeight * 5,
  {
    isStatic: true,
  },
);

let rightWall = Bodies.rectangle(
  matterContainer.clientWidth + THICCNESS / 2,
  matterContainer.clientHeight / 2,
  THICCNESS,
  matterContainer.clientHeight * 5,
  { isStatic: true },
);

// add all of the bodies to the world
World.add(engine.world, [leftWall, rightWall]);

let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: {
      visible: false,
    },
  },
});

World.add(engine.world, mouseConstraint);

render.mouse = mouse;

window.requestAnimationFrame(update);

function update() {
  for (var i = 0; i < bodiesDom.length; i++) {
    //for (var i = 0, l = bodiesDom.length; i < l; i++) {
    var bodyDom = bodiesDom[i];
    var body = bodies[i]; // Directly assign the Matter.js body from the array
    // Here you can perform actions with the `body` variable
    if (body) {
      bodyDom.style.transform =
        "translate( " +
        (body.position.x - bodyDom.offsetWidth / 2) +
        "px, " +
        (body.position.y - bodyDom.offsetHeight / 2) +
        "px )";
      bodyDom.style.transform += "rotate( " + body.angle + "rad )";
    }
  }

  window.requestAnimationFrame(update);
}

// Add MouseConstraint for mouse events

mConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: {
      visible: true,
    },
  },
});

World.add(world, mConstraint);

Events.on(mConstraint, "mousemove", function (event) {
  var foundBodies = Query.point(bodies, event.mouse.position);
  if (foundBodies.length > 0) {
    console.log("foundBodies", foundBodies);
    foundBodies.forEach(function (body) {
      body.render.cursor = "grab";
    });
  }
});

mouseConstraint.mouse.element.removeEventListener(
  "mousewheel",
  mouseConstraint.mouse.mousewheel,
);
mouseConstraint.mouse.element.removeEventListener(
  "DOMMouseScroll",
  mouseConstraint.mouse.mousewheel,
);

Render.run(render);

var runner = Runner.create();

Runner.run(runner, engine);

function handleResize(matterContainer) {
  // set canvas size to new values
  initialHeight = matterContainer.clientHeight;
  render.canvas.width = matterContainer.clientWidth;
  render.canvas.height = matterContainer.clientHeight;

  Matter.Body.setPosition(
    rightWall,
    Matter.Vector.create(
      matterContainer.clientWidth + THICCNESS / 2,
      initialHeight / 2,
    ),
  );
  scaleBodies();
}

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
}

var refreshWorld = debounce(function () {
  location.reload();
}, 300);

let groundY;
if (viewportWidth > 1025) {
  window.addEventListener("resize", refreshWorld);
}

function createGravity() {
  engine.gravity.y = 1;
}

let showMatter = gsap.timeline({
  paused: true,
  toggleActions: "play none none none",
  scrollTrigger: {
    trigger: ".matter-container",
    start: "top 80%",
    onEnter: createGravity,
  },
});
