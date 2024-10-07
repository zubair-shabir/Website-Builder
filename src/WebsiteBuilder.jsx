import React, { useState } from "react";
import axios from "axios";

const WebsiteBuilder = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    features: "",
  });
  const [generatedHTML, setGeneratedHTML] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleGenerate = async () => {
    setGeneratedHTML("");
    setLoading(true);

    const prompt = `I need you to generate a complete HTML document with embedded CSS within the <head> section. Please provide only the code with no explanations. strongly, no explanation is required. The website should possess the following characteristics:

- **Title**: ${formData.title}
- **description**: ${formData.description}
- **Features**: ${formData.features}

HTML and CSS requirements:
1. **Visual Appeal**: Use a cohesive color scheme and typography to create a visually striking and modern appearance.
2. **Responsiveness**: Ensure the design is responsive and adapts seamlessly to all screen sizes and devices.
3. **Layout Techniques**: Employ CSS Grid and Flexbox for a modular and adaptive structure that maintains flexibility.
4. **Animations**: Integrate smooth transitions and animations to enhance interactivity and user engagement.
5. **Web Design Best Practices**: Maintain readability and intuitive navigation, following contemporary design principles.
6. **Images from Pexels**: Integrate high-quality images from Pexels.com to enhance aesthetics. Ensure images are appropriately sized to complement the layout without disrupting the design. Avoid broken images and ensure all text elements are legible with appropriate contrast and coloring.

Your goal is to deliver a captivating and fully responsive landing page that adheres to modern web design standards, ensuring both functionality and visual appeal are prioritized.`;

    const p = `I want you to generate HTML and CSS code only, without any explanation. All CSS should be written inside the head tag. The website should have the following features \n Title: ${formData.title} \n Meta description: ${formData.description} \n Features: ${formData.features}. \n Generate beautiful, responsive HTML and CSS using modern web design practices like flexbox, grid, and animations. Only provide the code. The Website Should Be fully Responsive and enhancing the website for a beautiful design`;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 1500,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAPI_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data.choices[0].message.content.trim());
      setGeneratedHTML(response.data.choices[0].message.content.trim());
    } catch (error) {
      console.error("Error generating HTML:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 h-full w-[90vw]">
      <form>
        <div className="py-2">
          <label>Title: </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter page title"
            className="input input-bordered w-full max-w-s  bg-gray-700 text-gray-100"
          />
        </div>
        <div className="py-2">
          <label>Description: </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter page description"
            className="textarea textarea-bordered  w-full max-w-s  textarea-lg bg-gray-700 text-gray-100"
          ></textarea>
        </div>
        <div className="py-2">
          <label>Features (comma-separated): </label>

          <textarea
            name="features"
            value={formData.features}
            onChange={handleChange}
            placeholder="Enter features"
            className="textarea textarea-bordered  w-full max-w-s  textarea-lg bg-gray-700 text-gray-100"
          ></textarea>
        </div>
      </form>
      <button
        onClick={handleGenerate}
        disabled={loading}
        className={`btn  btn-active `}
      >
        {loading ? "Generating..." : "Generate Landing Page"}
      </button>

      {generatedHTML && (
        <div style={{ marginTop: "20px" }}>
          <h3>Generated Landing Page:</h3>
          <iframe
            title="Generated Page"
            srcDoc={generatedHTML}
            style={{ width: "100%", height: "500px", border: "1px solid #ccc" }}
          />
        </div>
      )}
    </div>
  );
};

export default WebsiteBuilder;
