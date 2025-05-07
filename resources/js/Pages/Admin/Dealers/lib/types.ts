export type Dealer = {
    id?: string;
    name: string;
    location?: string;
    region?: string;
    phone?: string;
    email?: string;
    website?: string;
    status: "active" | "inactive";
};
