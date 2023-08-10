// import type { UserInRes } from "@/shared/interfaces/user.interface";

class UserDTO {
    public _id: string;
    public email: string;
    public name: string;
    public token: string;

    constructor (user: any) {
        this._id = user._id
        this.email = user.email
        this.name = user.name
        this.token = user.token
    }
}

export default UserDTO


// export interface JobPostDTO {
//     contactName: string;
//     contactEmail: string;
//     contactPhone: string;
//     companyName: string;
//     industry: string;
//     location: string;
//     jobTitle: string;
//     jobDescription: string;
//     employmentType: string;
//     skillsQualifications: string;
//     compensationBenefits: string;
//     applicationProcess: string;
//     applicationDeadline: Date;
//   }
  