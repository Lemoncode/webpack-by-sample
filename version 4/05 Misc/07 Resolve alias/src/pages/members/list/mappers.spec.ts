import * as model from '../../../rest-api/model';
import * as vm from './viewModel';
import { mapMemberListModelToVM } from './mappers';

describe('pages/members/list/mappers specs', () => {
  describe('mapMemberListModelToVM', () => {
    it('should return empty array when passing members equals undefined', () => {
      // Arrange
      const members: model.Member[] = undefined;

      // Act
      const result = mapMemberListModelToVM(members);

      // Assert
      expect(result).toEqual([]);
    });

    it('should return empty array when passing members equals null', () => {
      // Arrange
      const members: model.Member[] = null;

      // Act
      const result = mapMemberListModelToVM(members);

      // Assert
      expect(result).toEqual([]);
    });

    it('should return empty array when passing members equals emtpy array', () => {
      // Arrange
      const members: model.Member[] = [];

      // Act
      const result = mapMemberListModelToVM(members);

      // Assert
      expect(result).toEqual([]);
    });

    it('should return array with one item when passing members equals array with one item', () => {
      // Arrange
      const members: model.Member[] = [
        {
          id: 1,
          login: 'test login',
          avatar_url: 'test avatar_url',
        },
      ];

      // Act
      const result = mapMemberListModelToVM(members);

      // Assert
      const expectedResult: vm.Member[] = [
        {
          id: 1,
          name: 'test login',
          avatarUrl: 'test avatar_url',
        },
      ];
      expect(result).toEqual(expectedResult);
    });

    it('should return array with two items when passing members equals array with two items', () => {
      // Arrange
      const members: model.Member[] = [
        {
          id: 1,
          login: 'test login 1',
          avatar_url: 'test avatar_url 1',
        },
        {
          id: 2,
          login: 'test login 2',
          avatar_url: 'test avatar_url 2',
        },
      ];

      // Act
      const result = mapMemberListModelToVM(members);

      // Assert
      const expectedResult: vm.Member[] = [
        {
          id: 1,
          name: 'test login 1',
          avatarUrl: 'test avatar_url 1',
        },
        {
          id: 2,
          name: 'test login 2',
          avatarUrl: 'test avatar_url 2',
        },
      ];
      expect(result).toEqual(expectedResult);
    });
  });
});
