// components/TabbedComponent.tsx
import * as React from "react";
import { motion } from "framer-motion";

interface Feature {
  title: string;
  content: string;
  backgroundImage: string;
}

interface TabbedComponentProps {
  features: Feature[];
}

const TabbedComponent: React.FC<TabbedComponentProps> = ({ features }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <div>
      <div style={{ display: "flex" }}>
        {features.map((feature, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              backgroundColor: selectedIndex === index ? "#333" : "#ccc",
              color: "#fff",
            }}
          >
            {feature.title}
          </button>
        ))}
      </div>
      <motion.div
        key={selectedIndex}
        initial={{ opacity: 0, backgroundPosition: "bottom" }}
        animate={{ opacity: 1, backgroundPosition: "center" }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          height: "300px",
          backgroundImage: `url(${features[selectedIndex].backgroundImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          color: "#fff",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <h2>{features[selectedIndex].title}</h2>
        <p>{features[selectedIndex].content}</p>
      </motion.div>
    </div>
  );
};

export default TabbedComponent;