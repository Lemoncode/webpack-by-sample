import { Member } from '../model/member';

const baseUrl = 'https://api.github.com/orgs/lemoncode/members';

export const fetchMembers = (): Promise<Member[]> => (
  fetch(baseUrl)
    .then(extractPayload)
);

const extractPayload = (response: Response): Promise<any> => (
  response.ok ?
    response.json() :
    responseError(response)
);

const responseError = (response: Response): Promise<any> => (
  response.json()
    .then((error) => (
      Promise.reject(error.message)
    ))
);
