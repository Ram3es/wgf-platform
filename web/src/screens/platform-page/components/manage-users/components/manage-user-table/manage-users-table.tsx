import { FC } from 'react';

import { Checkbox } from '@components/checkbox';
import { Icon } from '@components/icon';
import { Loader } from '@components/loader';
import { COLORS } from '@styles/colors';
import { DataColumn } from '../data-column/data-column';
import { GroupsData } from '../groups-data/groups-data';
import { HeaderColumn } from '../header-column/header-column';

import { useManageUsersTableState } from './manage-users-table.state';

import { DATE_OPTIONS } from '@constants/date';
import { PROMISES_AREA } from '@constants/promises-area';
import { MANAGE_USERS } from './manage-users-table.constants';

import { CommonStylesForTables } from '@screens/platform-page/platform-page.styles';
import { ManageUsersTableStyles as Styled } from './manage-users-table.styles';

export const ManageUsersTable: FC = () => {
  const {
    allUsers,
    onSelectAll,
    isAllSelected,
    onSelectUser,
    showSortByModal,
    handleToggleModal,
    handleChooseSortFilter,
    chosenFilter,
    handleAscending,
    handleDescending,
    handleCsvDownload,
    sortByModalRef,
  } = useManageUsersTableState();

  return (
    <CommonStylesForTables.TableWrapperUsers>
      <CommonStylesForTables.TableShadow>
        <Loader area={PROMISES_AREA.getAllUsers}>
          <CommonStylesForTables.InnerWrapper>
            <Styled.TableHeaderWrapper>
              <Styled.IconTextWrapper>
                <Icon type="manageUsersIcon" />
                <Styled.Text>Edit, delete or view users’ status.</Styled.Text>
              </Styled.IconTextWrapper>
              <Styled.Flex>
                <Styled.Rectangle>
                  No. of Users <Styled.Arrow />
                </Styled.Rectangle>
                <Styled.NumberOfUsers>{allUsers.length}</Styled.NumberOfUsers>
              </Styled.Flex>
            </Styled.TableHeaderWrapper>
            <Loader area={PROMISES_AREA.getAllUsersCsv}>
              <Styled.ArrowWrapper onClick={handleCsvDownload}>
                <Icon type="arrowDownload" />
              </Styled.ArrowWrapper>
            </Loader>

            <Styled.OptionsDiv>
              <Styled.OptionsToLeft>
                <Styled.CheckboxDiv>
                  <Checkbox
                    isMonoColor
                    label=""
                    onChange={onSelectAll}
                    isChecked={isAllSelected}
                    boxWidth={16}
                    boxHeight={16}
                    alignItems="center"
                  />
                  <Styled.TextTable>
                    {allUsers.filter((user) => user.isSelected).length} users
                    selected
                  </Styled.TextTable>
                </Styled.CheckboxDiv>
                {/* <Icon type="line" />
              <Styled.ReminderDiv>
                <Icon type="envelopeReminder" />
                <Styled.TextIcon>Send Email Reminder</Styled.TextIcon>
              </Styled.ReminderDiv>
              <Icon type="line" />
              <Icon type="envelopeCancel" />
              <Icon type="line" /> */}
              </Styled.OptionsToLeft>
              <Styled.SortByDiv>
                <Styled.SortByTextIcon
                  onClick={handleToggleModal}
                  ref={sortByModalRef}
                >
                  <p>Sort By</p>
                  <Icon type="triangle" />
                  {showSortByModal && (
                    <Styled.ModalSortBy>
                      <ul>
                        {MANAGE_USERS.filterOptions.map((option) => {
                          return (
                            <li
                              key={option}
                              onClick={handleChooseSortFilter(option)}
                            >
                              <Styled.RadioItem>
                                {chosenFilter === option && (
                                  <Icon type="check" />
                                )}
                              </Styled.RadioItem>
                              <p>{option}</p>
                            </li>
                          );
                        })}
                      </ul>
                    </Styled.ModalSortBy>
                  )}
                </Styled.SortByTextIcon>
                <Styled.ArrowSortByDiv>
                  <Styled.ArrowsForSort onClick={handleDescending}>
                    <Icon type="arrowUp" />
                  </Styled.ArrowsForSort>
                  <Styled.ArrowsForSort onClick={handleAscending}>
                    <Icon type="arrowDown" />
                  </Styled.ArrowsForSort>
                </Styled.ArrowSortByDiv>
              </Styled.SortByDiv>
            </Styled.OptionsDiv>

            <CommonStylesForTables.InnerTableWrapperManageUsers>
              <CommonStylesForTables.Table>
                <CommonStylesForTables.HeaderRowUsersTable>
                  <CommonStylesForTables.ControlColumn />
                  <CommonStylesForTables.ControlColumn>
                    Edit
                  </CommonStylesForTables.ControlColumn>
                  <HeaderColumn text="name" />
                  <CommonStylesForTables.HeaderColumn>
                    Group name
                  </CommonStylesForTables.HeaderColumn>

                  <HeaderColumn text="Registered" />
                  <HeaderColumn text="Email" isMiddleBox />
                  <HeaderColumn text="Career flex" color={COLORS.greenLight} />
                  <HeaderColumn
                    text="Career flex cooperation"
                    color={COLORS.greenLight}
                  />
                  <HeaderColumn
                    text="Career design game"
                    color={COLORS.violet}
                  />
                  <HeaderColumn
                    text="Career design canvas"
                    color={COLORS.yellow}
                  />
                  <HeaderColumn
                    text="My career adventure"
                    color={COLORS.lightBlue}
                  />
                </CommonStylesForTables.HeaderRowUsersTable>
                {allUsers.map((item: IUserExistingAndInvited) => {
                  let careerFlexResult = '-';
                  let careerFlexCooperationResult = '-';
                  const careerDesignGameResult = '-';
                  let careerDesignCanvasResult = '-';
                  const myCareerAdventureResult = '-';
                  item.results?.map((result) => {
                    const date = new Date(result.created).toLocaleString(
                      'en-US',
                      DATE_OPTIONS
                    );
                    if (result.quiz.title === 'caas-quiz') {
                      careerFlexResult = `${result.status} on ${date}`;
                    }
                    if (result.quiz.title === 'caas-cooperation-quiz') {
                      careerFlexCooperationResult = `${result.status} on ${date}`;
                    }
                    if (result.quiz.title === 'career-canvas') {
                      careerDesignCanvasResult = `${result.status} on ${date}`;
                    }
                  });
                  const registerDate = item?.created
                    ? new Date(item.created).toLocaleString(
                        'en-US',
                        DATE_OPTIONS
                      )
                    : item?.status
                    ? item.status.toLowerCase()
                    : '';
                  const fullName =
                    item.name || `${item.firstName} ${item.lastName}`;
                  const email = item.to || item.email;
                  const groups = item?.groups?.length
                    ? item.groups
                    : item.group
                    ? [item.group]
                    : [];

                  return (
                    <CommonStylesForTables.DataRowUsersTable
                      key={item.id}
                      isSelected={item.isSelected}
                    >
                      <CommonStylesForTables.ControlColumn>
                        <Checkbox
                          isMonoColor
                          label=""
                          onChange={onSelectUser(item)}
                          isChecked={!!item.isSelected}
                          boxWidth={16}
                          boxHeight={16}
                          alignItems="center"
                        />
                      </CommonStylesForTables.ControlColumn>
                      <CommonStylesForTables.ControlColumn>
                        <CommonStylesForTables.ControlWrapper>
                          <Icon type="edit" />
                        </CommonStylesForTables.ControlWrapper>
                      </CommonStylesForTables.ControlColumn>

                      <DataColumn text={fullName} />

                      <CommonStylesForTables.DataColumn>
                        <GroupsData groups={groups} allUsers={allUsers} />
                      </CommonStylesForTables.DataColumn>

                      {registerDate === 'pending' ||
                      registerDate === 'registration pending' ? (
                        <DataColumn text={registerDate} isWarning />
                      ) : (
                        <DataColumn text={registerDate} />
                      )}
                      <DataColumn text={email || ''} isMiddleBox />
                      <Styled.GameResultDataColumn>
                        {careerFlexResult}
                      </Styled.GameResultDataColumn>

                      <Styled.GameResultDataColumn>
                        {careerFlexCooperationResult}
                      </Styled.GameResultDataColumn>

                      <Styled.GameResultDataColumn>
                        {careerDesignGameResult}
                      </Styled.GameResultDataColumn>

                      <Styled.GameResultDataColumn>
                        {careerDesignCanvasResult}
                      </Styled.GameResultDataColumn>

                      <Styled.GameResultDataColumn>
                        {myCareerAdventureResult}
                      </Styled.GameResultDataColumn>
                    </CommonStylesForTables.DataRowUsersTable>
                  );
                })}
              </CommonStylesForTables.Table>
            </CommonStylesForTables.InnerTableWrapperManageUsers>
          </CommonStylesForTables.InnerWrapper>
        </Loader>
      </CommonStylesForTables.TableShadow>
    </CommonStylesForTables.TableWrapperUsers>
  );
};
