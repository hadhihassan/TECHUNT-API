import { CLIENT_MARKS, TALENT_MARKS } from "../../constants/progressBarMarks.js"

export default function getProfileProggressBarPercentage(talent, role) {
    if (role === "TALENT") {
        const totalFields = 12;
        let filledFields = 0;
        if (talent?.Profile.profile_Dp) filledFields++;
        if (talent?.Profile.Description) filledFields++;
        if (talent?.Profile.Title) filledFields++;
        if (talent?.Profile.Skills && talent?.Profile.Skills.length > 0) filledFields++;
        if (talent.Profile.Work_Experiance && talent?.Profile.Work_Experiance.length > 0) filledFields++;
        if (talent.Address) filledFields++;
        if (talent.PinCode) filledFields++;
        if (talent.City) filledFields++;
        if (talent.Country) filledFields++;
        if (talent.bankDetails) filledFields++;
        if (talent.isNumberVerify) filledFields++;
        if (talent.educations) filledFields++;
        const progress = (filledFields / totalFields) * 100;
        return filledFields === 13 ? 100 : progress;
    } else {
        const totalFields = 8;
        let filledFields = 0;
        if (talent?.Profile.profile_Dp) filledFields++;
        if (talent.Profile.Description) filledFields++;
        if (talent.Address) filledFields++;
        if (talent.PinCode) filledFields++;
        if (talent.City) filledFields++;
        if (talent.Country) filledFields++;
        if (talent.bankDetails) filledFields++;
        if (talent.isNumberVerify) filledFields++;
        const progress = (filledFields / totalFields) * 100;
        return filledFields === 8 ? 100 : progress;
    }
}
