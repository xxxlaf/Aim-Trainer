import { generate_targets } from "./utility_functions.js";

const level_data_json = [
    {
        "level":"0",
        "targets":{
            "count":"3",
            "radius":{
                "min":"0.5",
                "max":"0.5"
            },
            "velocity":{
                "min":"1",
                "max":"2"
            }
        }
    },
    {
        "level":"1",
        "targets":{
            "count":"5",
            "radius":{
                "min":"0.5",
                "max":"0.5"
            },
            "velocity":{
                "min":"2",
                "max":"2"
            }
        }
    }
];

export function generate_targets_by_level(level) {
    const all_level_data = JSON.parse(JSON.stringify(level_data_json));
    const level_data = all_level_data.find(data => data.level === level.toString());

    if (level_data) {
        const targets = level_data.targets;
        return generate_targets(
            parseInt(targets.count),
            parseInt(targets.radius.min),
            parseInt(targets.radius.max),
            parseInt(targets.velocity.min),
            parseInt(targets.velocity.max)
        );
    } else {
        console.error(`Level #${level} not found in the JSON data.`);
    }
}