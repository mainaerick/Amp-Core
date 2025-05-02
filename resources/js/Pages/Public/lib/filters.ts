interface FilterOption {
    label: string
    value: string
}

interface FilterGroup {
    id: string
    name: string
    type: "checkbox" | "radio"
    options: FilterOption[]
}

// Define category-specific filters
const categoryFilters: Record<string, FilterGroup[]> = {
    speakers: [
        {
            id: "size",
            name: "Size",
            type: "checkbox",
            options: [
                { label: '4"', value: "4inch" },
                { label: '6.5"', value: "6.5inch" },
                { label: '6x9"', value: "6x9inch" },
                { label: '8"', value: "8inch" },
                { label: '10"', value: "10inch" },
            ],
        },
        {
            id: "grade",
            name: "Grade",
            type: "radio",
            options: [
                { label: "Entry", value: "entry" },
                { label: "Premium", value: "premium" },
                { label: "Competition", value: "competition" },
            ],
        },
        {
            id: "type",
            name: "Type",
            type: "checkbox",
            options: [
                { label: "Coaxial", value: "coaxial" },
                { label: "Component", value: "component" },
                { label: "Tweeter", value: "tweeter" },
                { label: "Midrange", value: "midrange" },
            ],
        },
        {
            id: "brand",
            name: "Brand",
            type: "checkbox",
            options: [
                { label: "AudioTech", value: "audiotech" },
                { label: "SoundMaster", value: "soundmaster" },
                { label: "BassKing", value: "bassking" },
                { label: "PrecisionAudio", value: "precisionaudio" },
            ],
        },
    ],
    subwoofers: [
        {
            id: "size",
            name: "Size",
            type: "checkbox",
            options: [
                { label: '8"', value: "8inch" },
                { label: '10"', value: "10inch" },
                { label: '12"', value: "12inch" },
                { label: '15"', value: "15inch" },
            ],
        },
        {
            id: "grade",
            name: "Grade",
            type: "radio",
            options: [
                { label: "Entry", value: "entry" },
                { label: "Premium", value: "premium" },
                { label: "Competition", value: "competition" },
            ],
        },
        {
            id: "impedance",
            name: "Impedance",
            type: "radio",
            options: [
                { label: "2 ohms", value: "2ohms" },
                { label: "4 ohms", value: "4ohms" },
            ],
        },
        {
            id: "voiceCoil",
            name: "Voice Coil Type",
            type: "radio",
            options: [
                { label: "Single Voice Coil", value: "svc" },
                { label: "Dual Voice Coil", value: "dvc" },
            ],
        },
        {
            id: "enclosure",
            name: "Enclosure",
            type: "checkbox",
            options: [
                { label: "Sealed", value: "sealed" },
                { label: "Ported", value: "ported" },
                { label: "Bandpass", value: "bandpass" },
            ],
        },
        {
            id: "brand",
            name: "Brand",
            type: "checkbox",
            options: [
                { label: "AudioTech", value: "audiotech" },
                { label: "SoundMaster", value: "soundmaster" },
                { label: "BassKing", value: "bassking" },
                { label: "PrecisionAudio", value: "precisionaudio" },
            ],
        },
    ],
    amplifiers: [
        {
            id: "type",
            name: "Type",
            type: "radio",
            options: [
                { label: "Digital", value: "digital" },
                { label: "Analog", value: "analog" },
            ],
        },
        {
            id: "channel",
            name: "Channel",
            type: "radio",
            options: [
                { label: "Mono", value: "mono" },
                { label: "2 Channel", value: "2channel" },
                { label: "4 Channel", value: "4channel" },
                { label: "5 Channel", value: "5channel" },
            ],
        },
        {
            id: "features",
            name: "Features",
            type: "checkbox",
            options: [
                { label: "Bass Boost Remote", value: "bassBoostRemote" },
                { label: "Bass Boost", value: "bassBoost" },
                { label: "Speaker Input", value: "speakerInput" },
                { label: "Variable HPF", value: "variableHPF" },
                { label: "Variable LPF", value: "variableLPF" },
                { label: "LPF", value: "lpf" },
            ],
        },
        {
            id: "brand",
            name: "Brand",
            type: "checkbox",
            options: [
                { label: "AudioTech", value: "audiotech" },
                { label: "SoundMaster", value: "soundmaster" },
                { label: "BassKing", value: "bassking" },
                { label: "PrecisionAudio", value: "precisionaudio" },
            ],
        },
    ],
    accessories: [
        {
            id: "type",
            name: "Type",
            type: "checkbox",
            options: [
                { label: "Cables", value: "cables" },
                { label: "Connectors", value: "connectors" },
                { label: "Installation Kits", value: "installationKits" },
                { label: "Sound Dampening", value: "soundDampening" },
                { label: "Fuses", value: "fuses" },
            ],
        },
        {
            id: "brand",
            name: "Brand",
            type: "checkbox",
            options: [
                { label: "AudioTech", value: "audiotech" },
                { label: "SoundMaster", value: "soundmaster" },
                { label: "BassKing", value: "bassking" },
                { label: "PrecisionAudio", value: "precisionaudio" },
            ],
        },
    ],
    "car-audio": [
        {
            id: "features",
            name: "Features",
            type: "checkbox",
            options: [
                { label: "Smart Unit Receiver", value: "smartUnitReceiver" },
                { label: "Tablet", value: "tablet" },
                { label: "Detachable Tablet", value: "detachableTablet" },
                { label: "Alexa Auto", value: "alexaAuto" },
                { label: "Wireless Apple CarPlay", value: "wirelessCarPlay" },
                { label: "HDMI", value: "hdmi" },
                { label: "SD Card", value: "sdCard" },
                { label: "Dual Zone", value: "dualZone" },
                { label: "Apple CarPlay", value: "carPlay" },
                { label: "Android Auto", value: "androidAuto" },
                { label: "WebLink", value: "webLink" },
                { label: "Wireless Mirroring", value: "wirelessMirroring" },
                { label: "FLAC", value: "flac" },
                { label: "3-Way Network", value: "3wayNetwork" },
                { label: "Spotify", value: "spotify" },
                { label: "Dual Camera Input", value: "dualCameraInput" },
                { label: "Dual Bluetooth", value: "dualBluetooth" },
                { label: "DVD/CD Compatible", value: "dvdCdCompatible" },
            ],
        },
        {
            id: "size",
            name: "Size",
            type: "radio",
            options: [
                { label: '6.8"', value: "6.8inch" },
                { label: '7"', value: "7inch" },
                { label: '9"', value: "9inch" },
            ],
        },
        {
            id: "grade",
            name: "Grade",
            type: "radio",
            options: [
                { label: "Entry", value: "entry" },
                { label: "Premium", value: "premium" },
                { label: "Competition", value: "competition" },
            ],
        },
        {
            id: "equalizer",
            name: "Equalizer",
            type: "radio",
            options: [
                { label: "3-Band", value: "3band" },
                { label: "7-Band", value: "7band" },
                { label: "13-Band", value: "13band" },
            ],
        },
        {
            id: "preouts",
            name: "Preouts",
            type: "radio",
            options: [
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
            ],
        },
        {
            id: "dinSize",
            name: "DIN Size",
            type: "radio",
            options: [
                { label: "DIN-1", value: "din1" },
                { label: "Double-DIN", value: "doubleDin" },
            ],
        },
        {
            id: "brand",
            name: "Brand",
            type: "checkbox",
            options: [
                { label: "AudioTech", value: "audiotech" },
                { label: "SoundMaster", value: "soundmaster" },
                { label: "BassKing", value: "bassking" },
                { label: "PrecisionAudio", value: "precisionaudio" },
            ],
        },
    ],
}

export function getCategoryFilters(category: string): FilterGroup[] {
    return categoryFilters[category] || []
}
