 // ===============================
// TIỆM TRÀ NHỎ - GAME
// ===============================

let game = {
    money: 400,

    day: 1,

    opened: false,

    tea: 0,
    matcha: 0,

    blackPearl: 0,
    whitePearl: 0,

    cups: 0,

    served: 0,

    reviews: 0,

    rating: 5,

    order: null
};


// ===============================
// LƯU GAME
// ===============================

function saveGame() {
    localStorage.setItem(
        "tiemTraNho",
        JSON.stringify(game)
    );
}


// ===============================
// TẢI GAME
// ===============================

function loadGame() {

    let saved = localStorage.getItem("tiemTraNho");

    if (saved) {
        game = JSON.parse(saved);
    }
}


// ===============================
// TIỀN
// ===============================

function money(number) {
    return Math.floor(number) + "k";
}


// ===============================
// GIAO DIỆN
// ===============================

function updateHeader() {

    document.querySelector(".money b").textContent =
        money(game.money);

    document.querySelector(".day b").textContent =
        "Ngày " + game.day;

    document.querySelector(".day small").textContent =
        game.opened ? "Đang mở cửa" : "Chuẩn bị";
}


// ===============================
// MENU BÊN TRÁI
// ===============================

function updateMenu() {

    let goal = document.querySelector(".goal");

    if (!goal) return;

    let number = goal.querySelectorAll("b")[1];

    number.textContent =
        game.served + " / 5";
}


// ===============================
// KHO
// ===============================

function showStock() {

    let panel = document.querySelector(".content");

    panel.innerHTML = `

        <div class="pills">

            <div class="pill active">
                Trà
            </div>

            <div class="pill">
                Topping
            </div>

            <div class="pill">
                Ly
            </div>

        </div>


        ${stockRow(
            "🍵",
            "Trà sữa",
            "tea",
            "Dùng trong 3 ngày · vốn 4,5k"
        )}


        ${stockRow(
            "🍵",
            "Matcha",
            "matcha",
            "Dùng trong 3 ngày · vốn 6k"
        )}


        <hr>


        <div class="item">

            <div class="icon">
                🧋
            </div>

            <div>
                <b>Ly</b>

                <p>
                    Đang có ${game.cups}
                </p>
            </div>


            <div class="step">

                <button onclick="changeStock('cups',-5)">
                    -5
                </button>

                <button>
                    ${game.cups}
                </button>

                <button onclick="changeStock('cups',5)">
                    +5
                </button>

            </div>

        </div>


        <button class="cook"
                onclick="buyIngredients()">

            Nấu & nhập hàng →

        </button>

    `;
}


// ===============================
// DÒNG NGUYÊN LIỆU
// ===============================

function stockRow(icon,name,type,description) {

    return `

        <div class="item">

            <div class="icon">
                ${icon}
            </div>


            <div>

                <b>${name}</b>

                <p>
                    ${description}
                </p>

            </div>


            <div class="step">

                <button
                    onclick="changeStock('${type}',-5)">
                    -5
                </button>


                <button>
                    ${game[type]}
                </button>


                <button
                    onclick="changeStock('${type}',5)">
                    +5
                </button>

            </div>

        </div>

    `;
}


// ===============================
// THAY ĐỔI SỐ LƯỢNG
// ===============================

function changeStock(type,amount) {

    game[type] += amount;

    if (game[type] < 0) {
        game[type] = 0;
    }

    saveGame();

    showStock();

    updateNeed();
}


// ===============================
// NHẬP HÀNG
// ===============================

function buyIngredients() {

    let cost =

        game.tea * 4.5 +

        game.matcha * 6 +

        game.blackPearl * 2 +

        game.whitePearl * 1.5 +

        game.cups * 1.5;


    if (cost <= 0) {

        alert(
            "Hãy chọn số lượng nguyên liệu trước!"
        );

        return;
    }


    if (cost > game.money) {

        alert(
            "Không đủ tiền để nhập hàng!"
        );

        return;
    }


    game.money -= cost;

    saveGame();

    updateHeader();

    alert(
        "Đã nhập hàng thành công!"
    );

    updateNeed();
}


// ===============================
// NÂNG CẤP
// ===============================

function showUpgrades() {

    let panel =
        document.querySelector(".content");


    panel.innerHTML = `

        <p>
            Mua nâng cấp để mở rộng tiệm.
        </p>


        ${upgrade(
            "🍵",
            "Trà ô long",
            "Thêm trà ô long vào menu.",
            200
        )}


        ${upgrade(
            "🧋",
            "Trà sữa Thái",
            "Thêm món mới cho khách.",
            250
        )}


        ${upgrade(
            "🪑",
            "Bàn ghế",
            "Tăng số khách có thể phục vụ.",
            100
        )}


        ${upgrade(
            "✨",
            "Trang trí tiệm",
            "Tăng đánh giá của khách.",
            150
        )}

    `;
}


function upgrade(
    icon,
    name,
    description,
    price
) {

    return `

        <div class="item">

            <div class="icon">
                ${icon}
            </div>


            <div style="flex:1">

                <b>${name}</b>

                <p>
                    ${description}
                </p>

            </div>


            <button
                class="buy"
                onclick="buyUpgrade(${price})">

                ${price}k · Mua

            </button>

        </div>

    `;
}


function buyUpgrade(price) {

    if (game.money < price) {

        alert(
            "Bạn không đủ tiền!"
        );

        return;
    }


    game.money -= price;

    saveGame();

    updateHeader();

    alert(
        "Nâng cấp thành công!"
    );
}


// ===============================
// GIÁ BÁN
// ===============================

function showPrices() {

    let panel =
        document.querySelector(".content");


    panel.innerHTML = `

        <p>
            Điều chỉnh giá bán của đồ uống.
        </p>


        <div class="item">

            <div style="flex:1">

                <b>Trà sữa</b>

                <p>
                    Giá hiện tại
                </p>

            </div>


            <input
                id="milkPrice"
                type="number"
                value="25"
                style="
                width:70px;
                padding:10px;
                "
            >

            k

        </div>


        <div class="item">

            <div style="flex:1">

                <b>Matcha</b>

                <p>
                    Giá hiện tại
                </p>

            </div>


            <input
                id="matchaPrice"
                type="number"
                value="30"
                style="
                width:70px;
                padding:10px;
                "
            >

            k

        </div>


        <button
            class="cook"
            onclick="savePrices()">

            Lưu giá bán

        </button>

    `;
}


function savePrices() {

    alert(
        "Đã lưu giá bán!"
    );
}


// ===============================
// ĐÁNH GIÁ
// ===============================

function showReviews() {

    let panel =
        document.querySelector(".content");


    panel.innerHTML = `

        <div style="
            text-align:center;
            padding:50px 10px;
        ">

            <div style="
                font-size:35px;
                color:#d69a38;
            ">

                ★ ${game.rating.toFixed(1)}

            </div>


            <p>

                ${game.reviews}
                lượt đánh giá

            </p>


            <div class="pills">

                <div class="pill active">
                    Tất cả
                </div>

                <div class="pill">
                    5★
                </div>

                <div class="pill">
                    4★
                </div>

                <div class="pill">
                    3★
                </div>

            </div>


            <div class="notice">

                ${
                    game.reviews === 0

                    ?

                    "Chưa có đánh giá. Bán ly đầu tiên để nghe khách nói gì nhé."

                    :

                    "Khách đang rất thích Tiệm Trà Nhỏ! ⭐"

                }

            </div>

        </div>

    `;
}


// ===============================
// TỔNG KẾT
// ===============================

function showSummary() {

    let panel =
        document.querySelector(".content");


    panel.innerHTML = `

        <div class="summary">

            <h2>
                Tổng kết ngày ${game.day}
            </h2>


            <p>
                Tiền mặt
            </p>


            <div class="big">

                ${game.money}k

            </div>


            <p>
                Đã phục vụ:
                <b>${game.served}</b> khách
            </p>


            <p>
                Đánh giá:
                <b>${game.rating.toFixed(1)} ⭐</b>
            </p>


            <button
                class="make"
                onclick="nextDay()">

                Bắt đầu ngày tiếp theo →

            </button>

        </div>

    `;
}


// ===============================
// KHÁCH HÀNG
// ===============================

function openShop() {

    if (game.tea <= 0) {

        alert(
            "Bạn chưa có trà!"
        );

        return;
    }


    if (game.cups <= 0) {

        alert(
            "Bạn chưa có ly!"
        );

        return;
    }


    game.opened = true;


    createOrder();

    saveGame();

    updateHeader();

    showCustomer();

    updateNeed();
}


// ===============================
// TẠO ĐƠN
// ===============================

function createOrder() {

    let drinks = [

        {
            name:"Trà sữa",
            type:"tea",
            price:25
        },

        {
            name:"Matcha",
            type:"matcha",
            price:30
        }

    ];


    let drink =
        drinks[
            Math.floor(
                Math.random() * drinks.length
            )
        ];


    let toppings = [

        {
            name:"Không topping",
            type:"none",
            price:0
        },

        {
            name:"Trân châu đen",
            type:"black",
            price:6
        },

        {
            name:"Trân châu trắng",
            type:"white",
            price:5
        }

    ];


    let topping =
        toppings[
            Math.floor(
                Math.random() * toppings.length
            )
        ];


    game.order = {

        drink:drink.type,

        drinkName:drink.name,

        price:drink.price,

        topping:topping.type,

        toppingName:topping.name,

        toppingPrice:topping.price

    };

}


// ===============================
// HIỂN THỊ KHÁCH
// ===============================

function showCustomer() {

    let panel =
        document.querySelector(".content");


    let o = game.order;


    panel.innerHTML = `

        <div class="order">

            <div class="customer">

                <div class="avatar">
                    🧑🏻
                </div>


                <div>

                    <b>
                        An
                    </b>


                    <small>
                        Khách đang chờ
                    </small>

                </div>

            </div>

        </div>


        <h3>
            📋 Đơn hàng
        </h3>


        <div class="notice">

            🧋
            <b>${o.drinkName}</b>

            <br><br>

            ${
                o.topping === "none"

                ?

                "Không topping"

                :

                "➕ " + o.toppingName

            }

        </div>


        <h3>
            👇 Pha đồ uống
        </h3>


        <div class="pills">

            <button
                class="pill"
                onclick="chooseDrink('tea')">

                🍵 Trà sữa

            </button>


            <button
                class="pill"
                onclick="chooseDrink('matcha')">

                🍵 Matcha

            </button>

        </div>


        <div class="pills">

            <button
                class="pill"
                onclick="chooseTopping('none')">

                Không topping

            </button>


            <button
                class="pill"
                onclick="chooseTopping('black')">

                ⚫ Trân châu đen

            </button>


            <button
                class="pill"
                onclick="chooseTopping('white')">

                ⚪ Trân châu trắng

            </button>

        </div>


        <button
            class="make"
            onclick="serveCustomer()">

            Giao khách →

        </button>

    `;
}


// ===============================
// CHỌN TRÀ
// ===============================

let selectedDrink = null;

let selectedTopping = null;


function chooseDrink(type) {

    selectedDrink = type;

    alert(
        "Đã chọn " +
        (type === "tea"
            ? "Trà sữa"
            : "Matcha")
    );
}


function chooseTopping(type) {

    selectedTopping = type;

    alert(
        "Đã chọn topping!"
    );
}


// ===============================
// GIAO KHÁCH
// ===============================

function serveCustomer() {

    let o = game.order;


    if (selectedDrink !== o.drink) {

        alert(
            "Sai loại trà rồi! Hãy xem lại đơn."
        );

        return;
    }


    if (selectedTopping !== o.topping) {

        alert(
            "Sai topping rồi!"
        );

        return;
    }


    if (o.drink === "tea") {

        if (game.tea <= 0) {

            alert("Hết trà sữa!");

            return;
        }

        game.tea--;

    }


    if (o.drink === "matcha") {

        if (game.matcha <= 0) {

            alert("Hết matcha!");

            return;
        }

        game.matcha--;

    }


    game.cups--;


    if (o.topping === "black") {

        if (game.blackPearl <= 0) {

            alert(
                "Bạn hết trân châu đen!"
            );

            return;
        }

        game.blackPearl--;

    }


    if (o.topping === "white") {

        if (game.whitePearl <= 0) {

            alert(
                "Bạn hết trân châu trắng!"
            );

            return;
        }

        game.whitePearl--;

    }


    let earned =
        o.price +
        o.toppingPrice;


    game.money += earned;

    game.served++;

    game.reviews++;

    game.rating =
        Math.min(
            5,
            game.rating + 0.05
        );


    game.order = null;

    selectedDrink = null;

    selectedTopping = null;


    saveGame();

    updateHeader();

    updateMenu();

    alert(
        "🎉 Giao thành công! +" +
        earned +
        "k"
    );


    if (game.served >= 5) {

        game.opened = false;

        showSummary();

    } else {

        createOrder();

        showCustomer();

    }

    updateNeed();
}


// ===============================
// CẬP NHẬT THÔNG BÁO
// ===============================

function updateNeed() {

    let button =
        document.querySelector(".open");


    if (!button) return;


    if (game.opened) {

        button.textContent =
            "Đang mở cửa ✓";

        button.disabled = true;

        return;

    }


    button.disabled =
        !(game.tea > 0 &&
          game.cups > 0);


    button.textContent =
        "Mở cửa đón khách →";
}


// ===============================
// NGÀY MỚI
// ===============================

function nextDay() {

    game.day++;

    game.opened = false;

    game.served = 0;

    game.order = null;


    saveGame();

    updateHeader();

    updateMenu();

    showStock();

    updateNeed();

    alert(
        "🌞 Bắt đầu ngày " +
        game.day
    );

}


// ===============================
// XÓA GAME
// ===============================

function resetGame() {

    if (
        !confirm(
            "Bạn có chắc muốn xóa toàn bộ tiến trình?"
        )
    ) return;


    localStorage.removeItem(
        "tiemTraNho"
    );

    location.reload();

}


// ===============================
// TAB
// ===============================

function setupTabs() {

    document
        .querySelectorAll(".tabs button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(".tabs button")
                        .forEach(b =>
                            b.classList.remove(
                                "active"
                            )
                        );


                    button.classList.add(
                        "active"
                    );


                    let panel =
                        button.dataset.panel;


                    if (panel === "stock")
                        showStock();

                    if (panel === "upgrades")
                        showUpgrades();

                    if (panel === "prices")
                        showPrices();

                    if (panel === "reviews")
                        showReviews();

                    if (panel === "summary")
                        showSummary();

                }
            );

        });

}


// ===============================
// KHỞI ĐỘNG
// ===============================

loadGame();

setupTabs();

updateHeader();

updateMenu();

showStock();

updateNeed();


// Nút mở cửa

document
    .querySelector(".open")
    .addEventListener(
        "click",
        openShop
    );


// Nút trợ giúp

document
    .getElementById("help")
    ?.addEventListener(
        "click",
        () => {

            alert(
                "Cách chơi:\\n\\n" +
                "1. Vào Kho.\\n" +
                "2. Chọn nguyên liệu.\\n" +
                "3. Nấu & nhập hàng.\\n" +
                "4. Mở cửa.\\n" +
                "5. Làm đúng món khách gọi.\\n" +
                "6. Giao khách để nhận tiền."
            );

        }
    );
