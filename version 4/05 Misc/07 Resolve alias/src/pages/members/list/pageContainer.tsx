import * as React from 'react';
import { MemberListPage } from './page';
import { Member } from './viewModel';
import { fetchMembers } from '../../../rest-api/api/member';
import { mapMemberListModelToVM } from './mappers';

interface State {
  members: Member[];
}

export class MemberListPageContainer extends React.PureComponent<{}, State> {
  state = {
    members: [],
  };

  componentDidMount() {
    fetchMembers()
      .then((members) => {
        this.setState({
          members: mapMemberListModelToVM(members),
        });
      })
      .catch(alert);
  }

  render() {
    return (
      <MemberListPage
        members={this.state.members}
      />
    );
  }
}
