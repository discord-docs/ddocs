export default interface CurrentUser {
    id: string;
    username: string;
    discriminator: string;
    avatar: string;
    isAuthor: boolean;
}
