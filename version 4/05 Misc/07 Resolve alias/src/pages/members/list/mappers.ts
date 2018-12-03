import * as model from '../../../rest-api/model';
import * as vm from './viewModel';

export const mapMemberListModelToVM = (members: model.Member[]): vm.Member[] => (
  Array.isArray(members) ?
    members.map(mapMemberModelToVM) :
    []
);

const mapMemberModelToVM = (member: model.Member): vm.Member => ({
  id: member.id,
  name: member.login,
  avatarUrl: member.avatar_url,
});
