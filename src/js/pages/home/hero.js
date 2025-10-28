document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector(".hero-video");
    const btns = document.querySelector("#toggleBtn");
    const playIcon = btns.querySelector(".icon-play");
    const pauseIcon = btns.querySelector(".icon-pause");
    const text = btns.querySelector(".text");

    let isPlaying = true;

    btns.addEventListener("click", (e) => {
        e.stopPropagation();

        if (isPlaying) {
            video.pause();
            playIcon.classList.remove("active");
            pauseIcon.classList.add("active");
            text.textContent = "PLAY";
            isPlaying = false;
        } else {
            video.play();
            pauseIcon.classList.remove("active");
            playIcon.classList.add("active");
            text.textContent = "PAUSE";
            isPlaying = true;
        }
    });
});
