

// Handle about
const aboutBtns = document.querySelectorAll('.about-btn');
let aboutContent = document.getElementById("about-content");

const handleAboutBtnClick = (e) => {
    aboutContent.innerHTML = "";

    aboutBtns.forEach((btn) => {
        btn.classList.remove('btn-active');
    });

    e.target.classList.add('btn-active');

    const btnText = e.target.innerText.toLowerCase();
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');

    if (btnText.includes('history')) {
        let h3 = document.createElement('h3');

        h3.classList.add('fw-bold');
        h3.classList.add('fs-4');
        h3.classList.add('text-dark');
        h3.classList.add('pt-3');
        h3.innerHTML = "Lorem ipsum dolor sit.";

        let ul = document.createElement('ul');
        let li = document.createElement('li');
        let i = document.createElement('i');
        let p = document.createElement('p');

        i.classList.add('fa-solid');
        i.classList.add('fa-check');
        li.appendChild(i);

        p.innerHTML = "The Philosophy Of business analytics";
        li.appendChild(p);
        ul.appendChild(li);

        li.querySelector('p').innerHTML = "Fast-Track Your business";
        ul.appendChild(li.cloneNode(true));

        li.querySelector('p').innerHTML = "Lies And Damn Lies About business";
        ul.appendChild(li.cloneNode(true));

        li.querySelector('p').innerHTML = "The Ultimate Deal On business";
        ul.appendChild(li.cloneNode(true));

        aboutContent.appendChild(h3);
        aboutContent.appendChild(ul);

    } else if (btnText.includes('mission')) {
        p1.innerText = "Mission ipsum dolor sit amet consectetur adipisicing elit. Neque ab aliquid, atque enim, vero nobis quam beatae nesciunt aliquam molestias, optio hic laborum esse. Deserunt architecto officiis laudantium corporis voluptatem."
        p2.innerText = "Mission ipsum dolor sit amet consectetur adipisicing elit. Neque ab aliquid, atque enim, vero nobis quam beatae nesciunt aliquam molestias, optio hic laborum esse. Deserunt architecto officiis laudantium corporis voluptatem."

        aboutContent.appendChild(p1);
        aboutContent.appendChild(p2);
    } else if (btnText.includes('vision')) {
        p1.innerText = "Vision ipsum dolor sit amet consectetur adipisicing elit. Neque ab aliquid, atque enim, vero nobis quam beatae nesciunt aliquam molestias, optio hic laborum esse. Deserunt architecto officiis laudantium corporis voluptatem."
        p2.innerText = "Vision ipsum dolor sit amet consectetur adipisicing elit. Neque ab aliquid, atque enim, vero nobis quam beatae nesciunt aliquam molestias, optio hic laborum esse. Deserunt architecto officiis laudantium corporis voluptatem."

        aboutContent.appendChild(p1);
        aboutContent.appendChild(p2);
    } else {
        p1.innerText = "Support ipsum dolor sit amet consectetur adipisicing elit. Neque ab aliquid, atque enim, vero nobis quam beatae nesciunt aliquam molestias, optio hic laborum esse. Deserunt architecto officiis laudantium corporis voluptatem."
        p2.innerText = "Support ipsum dolor sit amet consectetur adipisicing elit. Neque ab aliquid, atque enim, vero nobis quam beatae nesciunt aliquam molestias, optio hic laborum esse. Deserunt architecto officiis laudantium corporis voluptatem."

        aboutContent.appendChild(p1);
        aboutContent.appendChild(p2);
    }
}

aboutBtns.forEach((btn) => {
    btn.addEventListener('click', handleAboutBtnClick);
});


// Handle Quote click
const avatars = document.querySelectorAll('.avatar-item');
let quoteContent = document.getElementById("quote-content");
let userName = document.getElementById("user-name");
let position = document.getElementById("user-position");

const quotes = [
    {
        userName: "Afifa Sampa",
        position: "COO, AMERIMAR ENTERPRISES, INC.",
        quote: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections Bonorum et Malorum original."
    },
    {
        userName: "John Nira",
        position: "COO, AMERIMAR ENTERPRISES, INC.",
        quote: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections Bonorum et Malorum original."
    },
    {
        userName: "John Jane",
        position: "COO, AMERIMAR ENTERPRISES, INC.",
        quote: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections Bonorum et Malorum original."
    },
    {
        userName: "Janen Asrafy",
        position: "COO, AMERIMAR ENTERPRISES, INC.",
        quote: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections Bonorum et Malorum original."
    },
    {
        userName: "Fatima Asrafy",
        position: "COO, AMERIMAR ENTERPRISES, INC.",
        quote: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections Bonorum et Malorum original."
    },
    {
        userName: "Irin Asrafy",
        position: "COO, AMERIMAR ENTERPRISES, INC.",
        quote: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections Bonorum et Malorum original."
    },
    {
        userName: "Mohima Asrafy",
        position: "COO, AMERIMAR ENTERPRISES, INC.",
        quote: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections Bonorum et Malorum original."
    },
    {
        userName: "Shipa",
        position: "COO, AMERIMAR ENTERPRISES, INC.",
        quote: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections Bonorum et Malorum original."
    }
]

const handleQuote = (e) => {
    avatars.forEach((btn) => {
        btn.classList.remove('avatar-active');
    });

    e.target.classList.add('avatar-active');
    const index = e.target.id.split('-')[1] - 1;

    userName.innerHTML = quotes[index].userName;
    position.innerHTML = `- ${quotes[index].position}`;
    quoteContent.innerHTML = `${quotes[index].userName} ${quotes[index].quote}`;
}

avatars.forEach((ava) => {
    ava.addEventListener('click', handleQuote);
});