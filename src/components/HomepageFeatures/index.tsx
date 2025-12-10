// import type {ReactNode} from 'react';
// import clsx from 'clsx';
// import Heading from '@theme/Heading';
// import styles from './styles.module.css';

// type FeatureItem = {
//   title: string;
//   Svg: React.ComponentType<React.ComponentProps<'svg'>>;
//   description: ReactNode;
// };

// const FeatureList: FeatureItem[] = [
//   {
//     title: 'Easy to Use',
//     Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
//     description: (
//       <>
//         Docusaurus was designed from the ground up to be easily installed and
//         used to get your website up and running quickly.
//       </>
//     ),
//   },
//   {
//     title: 'Focus on What Matters',
//     Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
//     description: (
//       <>
//         Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
//         ahead and move your docs into the <code>docs</code> directory.
//       </>
//     ),
//   },
//   {
//     title: 'Powered by React',
//     Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
//     description: (
//       <>
//         Extend or customize your website layout by reusing React. Docusaurus can
//         be extended while reusing the same header and footer.
//       </>
//     ),
//   },
// ];

// function Feature({title, Svg, description}: FeatureItem) {
//   return (
//     <div className={clsx('col col--4')}>
//       <div className="text--center">
//         <Svg className={styles.featureSvg} role="img" />
//       </div>
//       <div className="text--center padding-horiz--md">
//         <Heading as="h3">{title}</Heading>
//         <p>{description}</p>
//       </div>
//     </div>
//   );
// }

// export default function HomepageFeatures(): ReactNode {
//   return (
//     <section className={styles.features}>
//       <div className="container">
//         <div className="row">
//           {FeatureList.map((props, idx) => (
//             <Feature key={idx} {...props} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


// import type {ReactNode} from 'react';
// import clsx from 'clsx';
// import Heading from '@theme/Heading';
// import styles from './styles.module.css';

// type FeatureItem = {
//   title: string;
//   Svg: React.ComponentType<React.ComponentProps<'svg'>>;
//   description: ReactNode;
// };

// const FeatureList: FeatureItem[] = [
//   {
//     title: '1. Introduction to Physical AI',
//     Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
//     description: (
//       <>
//         Learn the fundamentals of Physical AI and how AI interacts with the real world.
//       </>
//     ),
//   },
//   {
//     title: '2. Humanoid Robotics Fundamentals',
//     Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
//     description: (
//       <>
//         Understand humanoid robot structure, sensors, actuators, and motion systems.
//       </>
//     ),
//   },
//   {
//     title: '3. Simulation & Control Systems',
//     Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
//     description: (
//       <>
//         Learn ROS2, Gazebo and real-world simulation setups to control robots safely.
//       </>
//     ),
//   },
//   {
//     title: '4. AI-Driven Motion & Navigation',
//     Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
//     description: (
//       <>
//         Master locomotion, path planning, balance control, and AI-based movement.
//       </>
//     ),
//   },
//   {
//     title: '5. Real-World Deployment & Projects',
//     Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
//     description: (
//       <>
//         Build real projects: object detection, grasping, walking, and autonomous tasks.
//       </>
//     ),
//   },
// ];

// function Feature({title, Svg, description}: FeatureItem) {
//   return (
//     <div className={clsx('col col--4')}>
//       <div className="text--center">
//         <Svg className={styles.featureSvg} role="img" />
//       </div>
//       <div className="text--center padding-horiz--md">
//         <Heading as="h3">{title}</Heading>
//         <p>{description}</p>
//       </div>
//     </div>
//   );
// }

// export default function HomepageFeatures(): ReactNode {
//   return (
//     <section className={styles.features}>
//       <div className="container">
//         <div className="row">
//           {FeatureList.map((props, idx) => (
//             <Feature key={idx} {...props} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }






import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link"; // <-- Added
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: ReactNode;
  link: string; // <-- NEW
};

const FeatureList: FeatureItem[] = [
  {
    title: "1. Introduction to Physical AI",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: <>Learn the fundamentals of Physical AI and how AI interacts with the real world.</>,
    link: "/docs/Chapter%201%20—%20Introduction", // <-- Your docs link
  },
  {
    title: "2. Humanoid Robotics Fundamentals",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: <>Understand humanoid robot structure, sensors, actuators, and motion systems.</>,
    link: "/docs/Chapter%202%20—%20The%20Robotic",
  },
  {
    title: "3. Simulation & Control Systems",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: <>Learn ROS2, Gazebo, and simulation setups for safe robot control.</>,
    link: "/docs/Chapter%203%20—%20The%20Digital",
  },
  {
    title: "4. AI-Driven Motion & Navigation",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: <>Master locomotion, path planning, balance control, and AI-based movement.</>,
    link: "/docs/Chapter%204%20—%20The%20AI-Robot%20Brain",
  },
  {
    title: "5. Real-World Deployment & Projects",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: <>Build real projects: detection, grasping, walking, and autonomous tasks.</>,
    link: "/docs/Chapter%204%20—%20The%20AI-Robot%20Brain",
  },
];

function Feature({ title, Svg, description, link }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <Link to={link} className={styles.featureCard}> {/* clickable card */}
        <div className="text--center">
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row features-grid">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
