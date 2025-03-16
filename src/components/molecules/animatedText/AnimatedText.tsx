import  { useState, useEffect } from "react";
type animatedText ={
  text : string,
  delay : number
}
const AnimatedText = ({ text , delay = 20 } : animatedText) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText((prev) => prev + text[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, delay);

    return () => clearInterval(interval); // Temizleme fonksiyonu
  }, [text, delay]);

  return <h1 className="text-2xl font-bold text-center w-full md:w-[40%]">{displayedText}</h1>;
};

export default AnimatedText;