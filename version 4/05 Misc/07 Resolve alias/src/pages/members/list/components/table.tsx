import * as React from 'react';
import { Member } from '../viewModel';
import { Header } from './header';
import { Body } from './body';

interface Props {
  members: Member[];
}

export const Table: React.StatelessComponent<Props> = (props) => (
  <table className="table table-striped">
    <Header />
    <Body members={props.members} />
  </table>
);
