async function getCharacter(id) {
    try {
        let response = await fetch(`https://swapi.dev/api/people/${id}/`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener personaje:", error);
    }
}

function* characterGenerator(start, end) {
    let current = start;
    while (current <= end) {
        yield current;
        current++;
    }
}

async function showCharacter(generator, sectionId) {
    let { value: characterId, done } = generator.next();
    if (!done) {
        let character = await getCharacter(characterId);
        if (character) {
            injectInfo(character, sectionId);
        }
    }
}

function injectInfo(character, sectionId) {
    let { name, height, mass } = character;
    let starWarsInfo = `
        <div class="col-12 col-md-6 col-lg-4 mb-4 fade-in">
            <div class="single-timeline-content d-flex">
                <div class="timeline-icon"><i class="fa fa-star" aria-hidden="true"></i></div>
                <div class="timeline-text">
                    <h6>${name}</h6>
                    <p>Estatura: ${height} cm.</p>
                    <p>Peso: ${mass} kg.</p>
                </div>
            </div>
        </div>
    `;
    document.getElementById(sectionId).insertAdjacentHTML('beforeend', starWarsInfo);
}


let section1Generator = characterGenerator(1, 5);
let section2Generator = characterGenerator(6, 10);
let section3Generator = characterGenerator(11, 15);


document.getElementById("show-1").addEventListener("mouseenter", () => {
    showCharacter(section1Generator, "starWars-1");
});

document.getElementById("show-2").addEventListener("mouseenter", () => {
    showCharacter(section2Generator, "starWars-2");
});

document.getElementById("show-3").addEventListener("mouseenter", () => {
    showCharacter(section3Generator, "starWars-3");
});

