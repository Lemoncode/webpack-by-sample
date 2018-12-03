import * as React from 'react';
import { Member } from './viewModel';
import { Table } from './components';

interface Props {
  members: Member[];
}

export const MemberListPage: React.StatelessComponent<Props> = (props) => (
  <>
    <h2>Members</h2>
    <Table
      members={props.members}
    />
  </>
);
