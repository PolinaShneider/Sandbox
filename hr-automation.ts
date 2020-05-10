class User {
    protected id: string;
    protected firstName: string;
    protected secondName: string;

    constructor(firstName: string, secondName: string) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.id = '123456';
    }
}

class Candidate extends User {
    public application?: Application;
    public experience: Experience;
    private worksInCompany: boolean;

    public respondToOffer: (application: Application, acceptOffer: boolean) => boolean;
    public applyForPosition: (position: Position, personalInfo: Candidate) => Application;

    constructor(
        firstName: string, secondName: string,
        experience: Experience, worksInCompany: boolean
    ) {
        super(firstName, secondName);
        this.experience = experience;
        this.worksInCompany = worksInCompany
    }
}

type Status = 'pending' | 'approved' | 'rejected';

class Application {
    public candidate: Candidate;
    public position: Position;
    public isRotation: boolean;
    public status: Status;
}

class Feedback {
    public candidate: Candidate;
    public position: Position;
    public isAccepted: boolean;

    constructor(candidate: Candidate, position: Position, isAccepted: boolean) {
        this.candidate = candidate;
        this.position = position;
        this.isAccepted = isAccepted;
    }
}

type InterviewStatus = 'upcoming' | 'completed';

class Interviewer extends User {
    public upcomingInterviews: Interview[];
    public conductInterview: (candidate: Candidate, position: Position) => void;
    public giveFeedback: (candidate: Candidate, position: Position, isAccepted: boolean) => Feedback;
}

class Interview {
    public status: InterviewStatus;
    public time: Date;
    public feedback: Feedback | null;

    constructor(candidate: Candidate, interviewer: Interviewer, time: Date) {
        this.status = 'upcoming';
        this.time = time;
    }
}

class HR extends User {
    public contactInterviewer: (interviewer: Interviewer, interviewInfo: Interview) => void;
    public inviteToInterview: (candidate: Candidate, interviewInfo: Interview) => void;
    public checkCandidateFitsRequirements: (position: Position, candidateExperience: Experience) => boolean;
    public makeOffer: (candidate: Candidate, position: Position) => void;
    public rejectCandidate: (candidate: Candidate, position: Position) => void;
    public changePositionStatus: (position: Position, isOpened: boolean) => void;
}

class Position {
    public isOpened: boolean;
    public requirements: Experience;
    public team: Team;

    constructor(isOpened: boolean, requirements: Experience, team: Team) {
        this.isOpened = isOpened;
        this.requirements = requirements;
        this.team = team;
    }
}

class Team {
    public openPositions: Position[];
    public addOpenPosition: (position: Position) => void;
}

/**
 * Technology: years
 */
type Experience = Record<string, number>;

const Pedro: Interviewer = new Interviewer('Pedro', 'Black');
const Folivora: Team = new Team();
const FrontendPosition: Position = new Position(true, {'javascript': 2}, Folivora);
Folivora.addOpenPosition(FrontendPosition);

const Vania: Candidate = new Candidate('Vania', 'Bell', {'javascript': 2}, false);
Vania.application = Vania.applyForPosition(FrontendPosition, Vania);

const Vanda: HR = new HR('Vanda', 'Great');
const ok = Vanda.checkCandidateFitsRequirements(FrontendPosition, Vania.application.candidate.experience);

if (Vania.application.isRotation) {
    if (
        !Vanda.checkCandidateFitsRequirements(FrontendPosition, Vania.application.candidate.experience) ||
        Folivora.openPositions.length === 0
    ) {
        Vanda.rejectCandidate(Vania, FrontendPosition);
    } else {
        HiringProcess();
    }
}

if (!ok) {
    Vanda.rejectCandidate(Vania, FrontendPosition);
} else {
    HiringProcess();
}

function HiringProcess() {
    const interview: Interview = new Interview(Vania, Pedro, new Date(2020, 12, 12, 14, 30));
    Vanda.contactInterviewer(Pedro, interview);
    Vanda.inviteToInterview(Vania, interview);

    Pedro.upcomingInterviews.push(interview);
    const time = Date.now();
    const nextInterview = Pedro.upcomingInterviews[0];
    if (time === nextInterview.time.getSeconds()) {
        Pedro.conductInterview(Vania, FrontendPosition);
        nextInterview.status = 'completed';
        const feedback: Feedback = Pedro.giveFeedback(Vania, FrontendPosition, true);

        if (feedback.isAccepted) {
            Vanda.makeOffer(Vania, FrontendPosition);
            Vania.application.status = 'approved';

            const accepts = Vania.respondToOffer(Vania.application, true);
            if (accepts) {
                Vanda.changePositionStatus(FrontendPosition, false);
            }
        }
    }
}
