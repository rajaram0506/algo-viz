let arr = [];

function generateArray() {
  arr = [];
  document.getElementById("array").innerHTML = "";

  for (let i = 0; i <15; i++) {
    let value = Math.floor(Math.random() * 100) + 1;
    arr.push(value);

    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = value * 3 + "px";

    const val = document.createElement("span");
    val.classList.add("bar-value");
    val.textContent = arr[i];

    bar.appendChild(val);
    document.getElementById("array").appendChild(bar);
  }
}

async function bubbleSort() { 
    resetBars();
    disableButtons(true);
  let bars = document.getElementsByClassName("bar");
  let bar_values = document.getElementsByClassName("bar-value");
  for (let i = 0; i < arr.length; i++) { 
    for (let j = 0; j < arr.length - i - 1; j++) {
      
    //  highlightBars(j, j + 1, "compare");
    //  await sleep(200);
      bars[j].style.background = "red";
      bars[j + 1].style.background = "yellow";
      
      if (arr[j] > arr[j + 1]) {
        incrementStep();
      //  clearHighlights(j, j + 1);
      //  highlightBars(j, j + 1, "swap");

        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      //  generateBars();
      //  await sleep(300);
        bars[j].style.height = arr[j] * 3 + "px";
        bars[j + 1].style.height = arr[j + 1] * 3 + "px";
      }
      //clearHighlights(j, j + 1);
    //  await new Promise(resolve => setTimeout(resolve, 100));
        await sleep(getSpeed());

      bars[j].style.background = "steelblue";
      bars[j + 1].style.background = "green";
    }
     // Mark sorted element
    //document.getElementsByClassName("bar")[n - i - 1].classList.add("sorted");
  }
  arr.sort((a, b) => a - b);
   for (let i = 0; i < arr.length; i++) { 
    bar_values[i].textContent = arr[i];
  } 
  disableButtons(false);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function merge(arr, l, m, r) {
  let bars = document.getElementsByClassName("bar");

  let left = arr.slice(l, m + 1);
  let right = arr.slice(m + 1, r + 1);

  let i = 0, j = 0, k = l;

  while (i < left.length && j < right.length) { incrementStep();
    bars[k].classList.add("compare");
     bars[k].style.background = "red";
      bars[k + 1].style.background = "yellow";
    await sleep(getSpeed());

    if (left[i] <= right[j]) {  
      arr[k] = left[i];
      bars[k].style.height = left[i] * 3 + "px";
      i++;
    } else {
      arr[k] = right[j];
      bars[k].style.height = right[j] * 3 + "px";
      j++;
    }

    bars[k].classList.remove("compare");
    bars[k].style.background = "steelblue";
    bars[k + 1].style.background = "green";
    k++;
  }

  while (i < left.length) {  incrementStep();
    arr[k] = left[i];
    //arr[k++] = left[i++];
    bars[k].style.height = left[i] * 3 + "px";
    i++;
    k++;
    await sleep(getSpeed());
  }

  while (j < right.length) {  incrementStep();
    arr[k] = right[j];
    bars[k].style.height = right[j] * 3 + "px";
    j++;
    k++;
    await sleep(getSpeed());
  }
}

async function mergeSortUtil(arr, l, r) {
    
  if (l >= r) return;

  let m = Math.floor((l + r) / 2);

  await mergeSortUtil(arr, l, m);
  await mergeSortUtil(arr, m + 1, r);
  await merge(arr, l, m, r);
  
}

async function mergeSort() { 
    resetBars();
    disableButtons(true);
  await mergeSortUtil(arr, 0, arr.length - 1);
  // Mark sorted
  let bars = document.getElementsByClassName("bar");
  let bar_values = document.getElementsByClassName("bar-value");
  for (let bar of bars) {
    bar.classList.add("sorted");
    bar.style.background = "green";
  }
  arr.sort((a, b) => a - b);
   for (let i = 0; i < arr.length; i++) { 
    bar_values[i].textContent = arr[i];
  } 
  disableButtons(false);
}

async function partition(arr, low, high) {
  let bars = document.getElementsByClassName("bar");

  let pivot = arr[high];
  bars[high].style.background = "yellow";

  let i = low - 1;

  for (let j = low; j < high; j++) {
    bars[j].style.background = "red";
    await sleep(getSpeed());

    if (arr[j] < pivot) {
      i++;

      [arr[i], arr[j]] = [arr[j], arr[i]];
      bars[i].style.height = arr[i] * 3 + "px";
      bars[j].style.height = arr[j] * 3 + "px";
    }

    bars[j].style.background = "steelblue";
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  bars[i + 1].style.height = arr[i + 1] * 3 + "px";
  bars[high].style.height = arr[high] * 3 + "px";

  bars[high].style.background = "steelblue";
  bars[i + 1].style.background = "green";

  return i + 1;
}

async function quickSortUtil(arr, low, high) {
  if (low < high) {  incrementStep();
    let pi = await partition(arr, low, high);

    await quickSortUtil(arr, low, pi - 1);
    await quickSortUtil(arr, pi + 1, high);
  }
}

async function quickSort() { 
    resetBars();
    disableButtons(true);
  //console.log(arr);return false;
  await quickSortUtil(arr, 0, arr.length - 1);
  let bars = document.getElementsByClassName("bar");
   let bar_values = document.getElementsByClassName("bar-value");
  for (let bar of bars) {
    bar.style.background = "green";
  }
  //arr.sort((a, b) => a - b);
    arr.sort((a, b) => a - b);
   for (let i = 0; i < arr.length; i++) { 
    bar_values[i].textContent = arr[i];
  }
  disableButtons(false);
}

async function binarySearch() { 
    resetBars();
    disableButtons(true);
    sortArrayForBinarySearch();
  let bars = document.getElementsByClassName("bar");
  let target = Number(document.getElementById("target").value);

  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {  incrementStep();
    let mid = Math.floor((left + right) / 2);

    bars[mid].style.background = "yellow";
    await sleep(getSpeed());

    if (arr[mid] === target) {
      bars[mid].style.background = "green";
      disableButtons(false);
      return;
    }

    if (arr[mid] < target) {
      for (let i = left; i <= mid; i++) {
        bars[i].style.background = "red";
      }
      left = mid + 1;
    } else {
      for (let i = mid; i <= right; i++) {
        bars[i].style.background = "red";
      }
      right = mid - 1;
    }

    await sleep(getSpeed());
  }
disableButtons(false);
  alert("Element not found");
}


async function linearSearch() { 
    resetBars();
    disableButtons(true);
  let bars = document.getElementsByClassName("bar");
  let target = Number(document.getElementById("linearTarget").value);

  for (let i = 0; i < arr.length; i++) { 
    bars[i].style.background = "yellow";
    await sleep(getSpeed());
    if (arr[i] === target) {
      bars[i].style.background = "green";
      disableButtons(false);
      return;
    }

    bars[i].style.background = "red";
  }
  disableButtons(false);
  alert("Element not found");
}

function getSpeed() {
  return document.getElementById("speed").value;
}

function disableButtons(state) {
  document.querySelectorAll("button")
    .forEach(btn => btn.disabled = state);
}

let steps = 0;

function incrementStep() {
  steps++;
  document.getElementById("steps").innerText = "Steps: " + steps;
}

function resetBars() {
  let bars = document.getElementsByClassName("bar");
  for (let bar of bars) {
    bar.style.background = "#38bdf8";
  }
  steps = 0;
}

const toggleBtn = document.getElementById("themeToggle");
const root = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
  toggleBtn.textContent = savedTheme === "dark" ? "☀ Light" : "🌙 Dark";
}

// Toggle theme
toggleBtn.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";

  if (isDark) {
    root.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
    toggleBtn.textContent = "🌙 Dark";
  } else {
    root.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "☀ Light";
  }
});

function sortArrayForBinarySearch() {
  arr.sort((a, b) => a - b);
 // generateArray(); // VERY IMPORTANT
}

/* function highlightBars(i, j, className) {
  const bars = document.getElementsByClassName("bar");
  bars[i]?.classList.add(className);
  bars[j]?.classList.add(className);
}

function clearHighlights(i, j) {
  const bars = document.getElementsByClassName("bar");
  bars[i]?.classList.remove("compare", "swap");
  bars[j]?.classList.remove("compare", "swap");
}

const container = document.getElementById("barsContainer");
function generateBars() {
  container.innerHTML = "<div>";

  for (let i = 0; i < arr.length; i++) {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = arr[i] * 3 + "px";

    const value = document.createElement("span");
    value.className = "bar-value";
    value.innerText = arr[i];

    bar.appendChild(value);
    container.appendChild(bar);
  }
} */





