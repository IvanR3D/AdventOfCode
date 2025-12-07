function solve(data) {
    data.forEach(line => {
        const data = line.split(' ');
        reindeers[data[0]] = {speed: parseInt(data[3]), moveTime: parseInt(data[6]), restTime: parseInt(data[13]), cycleTime: parseInt(data[6]) + parseInt(data[13]), distance: 0, points: 0};
    });
    for (let i = 0; i < raceTime; i++) {
        Object.keys(reindeers).forEach(reindeer => {
            if (i%reindeers[reindeer].cycleTime < reindeers[reindeer].moveTime) {
                reindeers[reindeer].distance += reindeers[reindeer].speed;
            }
        });
        const maxDistance = Math.max(...Object.values(reindeers).map(r => r.distance));    
        Object.keys(reindeers).forEach(reindeer => {
            if (reindeers[reindeer].distance === maxDistance) {
                reindeers[reindeer].points += 1;
            }
        });
    }
    return [Math.max(...Object.values(reindeers).map(r => r.distance)), Math.max(...Object.values(reindeers).map(r => r.points))];
}
const data = $('*').textContent.split('\n').slice(0,-1);
const raceTime = 2503;
const reindeers = {};
const result = solve(data);
console.log('Part 1 ->', result[0]);
console.log('Part 2 ->', result[1]);