import React, { useState } from "react";
import Ingredient from "./Ingredient";
import Options from "./Options";

const Choose = () => {
    

    const apikey = import.meta.env.VITE_API_KEY;

    const [infoFromOptions, setInfoFromOptions] = useState();

    const [gptPromptText, setGptPromptText] = useState([]);

    

    const ingredientsData = [
        { name: "Meat", imageSrc: "/images/meat.png" },
        { name: "Apple", imageSrc: "/images/apple.png" },
        { name: "Banana", imageSrc: "/images/banana.png" },
        { name: "Carrot", imageSrc: "/images/carrot.png" },
    ];

    const handleIngredientClick = (ingredient) => {
        setGptPromptText([...gptPromptText, ingredient.name]);
    };


    
    const generateImage = async (promptTextForImage) => {
            console.log('generating the image')
            const options = {
                method: "POST",
                headers: {
                    Authorization: ` Bearer ${apikey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: "Generate me nature mountain, island, ocean",
    
                    n: 1,
                    size: "512x512",
                }),
            };
    
            try {
                const response = await fetch(
                    "https://api.openai.com/v1/images/generations",
                    options
                );
                const data = await response.json();
                console.log("data: ", data);
                // console.log(data);
    
            } catch (error) {
                console.error(error);
            }
        };
    
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-wrap pt-[120px]">
                {ingredientsData.map((ingredient, index) => (
                    <Ingredient
                        key={index}
                        imageSrc={ingredient.imageSrc}
                        onClick={() => handleIngredientClick(ingredient)}
                    />
                ))}
                <div>
                    <h3>Selected Ingredients:</h3>
                    <ul>
                        {gptPromptText.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
                <button
                    onClick={() => generateImage("ede")}
                    className="px-4 h-[50px] m-4 rounded-2xl bg-indigo-400"
                >
                    Generate Dish
                </button>
            </div>
            <p>infoFromOptions: {infoFromOptions}</p>
            <Options setInfoFromOptions={setInfoFromOptions}/>
        </div>
    );
};

export default Choose;
