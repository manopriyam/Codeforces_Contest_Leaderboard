async function fetchRatingChanges(contestId) {
    const url = `https://codeforces.com/api/contest.ratingChanges?contestId=${contestId}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "OK") {
            return data.result;
        }
    } catch (error) {
        return null;
    }
};


function findUserDetails(data, handles) {
    return data.filter((user) => handles.includes(user.handle));
};


function display (userDetails, batch) {
    const lbd = userDetails.map(user => [user.rank, user.handle]);
    const batchlbd = document.getElementById(`${batch}`);
    let cnt = qty;
    for (let [rk, id] of lbd) {
        if (!cnt) break;
        const newentry = document.createElement('div');
        newentry.classList.add('account');
        rk = String(rk).padStart(5, 0);
        newentry.innerText = `${rk} ${id}`;
        batchlbd.appendChild(newentry);
        cnt--;
    }
};


fetchRatingChanges(contestId).then((data) => {
    if (data) {
        if (showY4) {
            document.querySelectorAll(".bname")[0].innerText = `Batch ${Y4}`;
            document.querySelectorAll(".list")[0].id = `${Y4}`;
            const lbdY4 = findUserDetails(data, handles[Y4]);
            display(lbdY4, Y4);
        } else document.querySelector(".b4").style.display = "none";
        if (showY3) {
            document.querySelectorAll(".bname")[1].innerText = `Batch ${Y3}`;
            document.querySelectorAll(".list")[1].id = `${Y3}`;
            const lbdY3 = findUserDetails(data, handles[Y3]);
            display(lbdY3, Y3);
        } else document.querySelector(".b3").style.display = "none";
        if (showY2) {
            document.querySelectorAll(".bname")[2].innerText = `Batch ${Y2}`;
            document.querySelectorAll(".list")[2].id = `${Y2}`;
            const lbdY2 = findUserDetails(data, handles[Y2]);
            display(lbdY2, Y2);
        } else document.querySelector(".b2").style.display = "none";       
        if (showY1) {
            document.querySelectorAll(".bname")[3].innerText = `Batch ${Y1}`;
            document.querySelectorAll(".list")[3].id = `${Y1}`;
            const lbdY1 = findUserDetails(data, handles[Y1]);
            display(lbdY1, Y1);
        } else document.querySelector(".b1").style.display = "none";
    }
});

document.querySelector(".title").innerText = `${title}`;
document.querySelector(".contestname").innerText = `${contestname}`;