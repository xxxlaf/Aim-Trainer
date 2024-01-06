import { generate_targets } from "./utility_functions.js";

const level_data_json = [
    {
        "level": "0",
        "targets": {
            "count": "3",
            "radius": {
                "min": "0.5",
                "max": "0.5"
            },
            "velocity": {
                "min": "1",
                "max": "2"
            }
        }
    },
    {
        "level": "1",
        "targets": {
            "count": "5",
            "radius": {
                "min": "0.5",
                "max": "0.5"
            },
            "velocity": {
                "min": "2",
                "max": "2"
            }
        }
    },
    {
        "level": "2",
        "targets": {
            "count": "7",
            "radius": {
                "min": "0.7",
                "max": "0.7"
            },
            "velocity": {
                "min": "2",
                "max": "3"
            }
        }
    },
    {
        "level": "3",
        "targets": {
            "count": "8",
            "radius": {
                "min": "0.6",
                "max": "0.6"
            },
            "velocity": {
                "min": "3",
                "max": "4"
            }
        }
    },
    {
        "level": "4",
        "targets": {
            "count": "10",
            "radius": {
                "min": "0.8",
                "max": "0.8"
            },
            "velocity": {
                "min": "3",
                "max": "5"
            }
        }
    },
    {
        "level": "5",
        "targets": {
            "count": "12",
            "radius": {
                "min": "1.0",
                "max": "1.0"
            },
            "velocity": {
                "min": "4",
                "max": "6"
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