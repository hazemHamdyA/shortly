const continer = document.querySelector("[data-continer]");
const shortBtn = document.querySelector("[data-btn]");
const urlFiel = document.querySelector("[data-search]");

const render = async function (url) {
  const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
  const data = await res.json();
  const realData = {
    orginalURL: data.result["original_link"],
    shortURl: data.result["short_link"],
  };
  const html = `
  <div class="py-6 px-8 w-full bg-white shadow-md flex justify-between items-center rounded-lg md:flex-col md:px-0">
  <p class="text-black font-bold">${realData.orginalURL}</p>
  <div class="flex items-center space-x-4">
    <p data-short-url class="text-[#2acfcf] font-bold">
      ${realData.shortURl}
    </p>
    <a data-copy class="px-6 py-2 bg-[#2acfcf] text-white capitalize font-bold rounded-full cursor-pointer hover:bg-[#5ee9e9]">copy</a>
  </div>
</div>
`;

  continer.insertAdjacentHTML("afterbegin", html);
};

shortBtn.addEventListener("click", async () => {
  continer.innerHTML = "";
  const url = urlFiel.value;
  // prettier-ignore
  if (/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(url)) {
    await render(url);
    urlFiel.value = "";
   continer.querySelector("[data-copy]").addEventListener("click",()=>{
    navigator.clipboard.writeText(`${continer.querySelector("[data-short-url]").textContent}`)
    alert("Copied")
  })
  } else alert("You have entered an invalid email address!");
});

const navContent = document.querySelector("[data-nav-content]");
const openBtn = document.querySelector("[data-open]");
const closeBtn = document.querySelector("[data-close]");

openBtn.addEventListener("click", function () {
  navContent.classList.remove("hidden");
  closeBtn.classList.remove("hidden");
  this.classList.add("md:hidden");
});

closeBtn.addEventListener("click", function () {
  openBtn.classList.remove("md:hidden");
  navContent.classList.add("hidden");
  this.classList.add("hidden");
});

const darkBtn = document.querySelector("[data-dark]");
const lightBtn = document.querySelector("[data-light]");

darkBtn.addEventListener("click", function () {
  this.classList.add("hidden");
  document.documentElement.classList.add("dark");
  lightBtn.classList.remove("hidden");
});

lightBtn.addEventListener("click", function () {
  this.classList.add("hidden");
  document.documentElement.classList.remove("dark");
  darkBtn.classList.remove("hidden");
});
