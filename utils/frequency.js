export default function frequency(data) {
    let frequency = []
    data.forEach(skill => {
        if (skill.name in frequency) {
            frequency[skill.name]++;
        }
        else {
            frequency[skill.name] = 1;
        }
    });
    return frequency
}
