"use strict";

const icons = document.querySelectorAll(".category__icon");
const categories = document.querySelectorAll(".category");
const categoryPoints = document.querySelectorAll(".points");
const allScores = document.querySelectorAll(".score");

const getData = async function () {
  try {
    // get icon and category name data from file and return array of scores
    const resp = await fetch("./data.json");
    if (!resp.ok) throw new Error("No data");
    const data = await resp.json();
    let scores = [];
    categories.forEach((category, i) => {
      icons[i].src = data[i].icon;
      category.textContent = data[i].category;
      scores.push(data[i].score);
    });
    return scores;
  } catch (err) {
    throw err;
  }
};

// make counter for each score number
const makeScoreCounter = async function () {
  const countSpeed = 100;
  try {
    const targetArr = await getData();

    // calculate average from category scores
    const finalScore = Math.round(
      targetArr.reduce((acc, score, i, arr) => acc + score / arr.length, 0)
    );

    // add average score to array with scores
    targetArr.unshift(finalScore);

    // use array of all scores to set counter for each of them
    targetArr.forEach((el, i) => {
      const updateCounter = () => {
        const target = el;
        const count = +allScores[i].textContent;
        const increment = target / countSpeed;

        if (count > target || target - count < increment) {
          allScores[i].textContent = target;
        } else {
          allScores[i].textContent = Math.round(count + increment);
          setTimeout(updateCounter, 10);
        }
      };
      updateCounter();
    });
  } catch (err) {
    categories.forEach((category) => {
      category.textContent = err.message;
    });
  }
};

makeScoreCounter();
