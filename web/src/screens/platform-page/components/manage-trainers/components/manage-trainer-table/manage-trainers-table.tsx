import { Loader } from '@components/loader';
import { PROMISES_AREA } from '@constants/promises-area';
import { CommonStylesForTables } from '@screens/platform-page/platform-page.styles';
import { ManageTrainersTableStyles as Styled } from './manage-trainers-table.styles';
import { FC } from 'react';
import { Icon } from '@components/icon';
import { Checkbox } from '@components/checkbox';
import { useManageTrainersTableState } from './manage-trainers-table.state';
import { MANAGE_TRAINERS } from './manage-trainers-table.constants';
import { HeaderColumn } from '@screens/platform-page/components/manage-users/components/header-column/header-column';
import { COLORS } from '@styles/colors';
import { DataColumn } from '@screens/platform-page/components/manage-users/components/data-column/data-column';

export const ManageTrainersTable: FC = () => {
  const {
    allTrainers,
    showSortByModal,
    toggleCheckedAll,
    toggleModal,
    sortByModalRef,
    chosenFilter,
    handleChooseSortFilter,
    handleAscending,
    handleDescending,
    isAllSelected,
    selectedTrainers,
    onSelectTrainer,
    handleCsvDownload,
    editHandler,
    renderTrainer,
  } = useManageTrainersTableState();

  return (
    <CommonStylesForTables.TableWrapperUsers>
      <CommonStylesForTables.TableShadow>
        <Loader area={PROMISES_AREA.getAllTrainers}>
          <CommonStylesForTables.InnerWrapper>
            <Styled.TableHeaderWrapper>
              <Styled.IconTextWrapper>
                <Icon type="manageTrainersIcon" />
                <Styled.Text>
                  {' '}
                  Edit, delete or view trainers` status
                </Styled.Text>
              </Styled.IconTextWrapper>
              <Styled.Flex>
                <Styled.Rectangle>
                  No. of Trainers <Styled.Arrow />
                </Styled.Rectangle>
                <Styled.NumberOfTrainers>
                  {allTrainers.length}
                </Styled.NumberOfTrainers>
              </Styled.Flex>
            </Styled.TableHeaderWrapper>
            <Loader area={PROMISES_AREA.getAllUsersCsv || 'getAllTrainersCSV'}>
              <Styled.ArrowWrapper onClick={handleCsvDownload}>
                <Icon type="arrowDownload" />
              </Styled.ArrowWrapper>
            </Loader>

            <Styled.OptionsDiv>
              <Styled.FlexDiv>
                <Styled.CheckboxDiv>
                  <Checkbox
                    boxHeight={16}
                    boxWidth={16}
                    alignItems="center"
                    isMonoColor
                    label=""
                    onChange={toggleCheckedAll}
                    isChecked={isAllSelected}
                  />
                  <Styled.TextTable>
                    {selectedTrainers +
                      (selectedTrainers === 1
                        ? ' trainer selected'
                        : ' trainers selected')}{' '}
                    {}
                  </Styled.TextTable>
                </Styled.CheckboxDiv>
                {/* <Icon type="line" />
                <Styled.Flex>
                  <Icon type="envelopeReminder" />
                  <Styled.TextIcon>Send Email Reminder</Styled.TextIcon>
                </Styled.Flex>
                <Icon type="line" />
                <Icon type="envelopeCancel" />
                <Icon type="line" /> */}
              </Styled.FlexDiv>
              <Styled.SortByDiv>
                <Styled.SortByTextIcon
                  ref={sortByModalRef}
                  onClick={toggleModal}
                >
                  <p>Sort By</p>
                  <Icon type="triangle" />
                  {showSortByModal && (
                    <Styled.ModalSortBy>
                      <ul>
                        {MANAGE_TRAINERS.filterOptions.map(
                          (option: Record<string, string | undefined>) => {
                            const key: string = Object.keys(option).join('');

                            return (
                              <li
                                key={key}
                                onClick={() => handleChooseSortFilter(key)}
                              >
                                <Styled.RadioItem>
                                  {chosenFilter === key && (
                                    <Icon type="check" />
                                  )}
                                </Styled.RadioItem>
                                <p>{option[key]}</p>
                              </li>
                            );
                          }
                        )}
                      </ul>
                    </Styled.ModalSortBy>
                  )}
                </Styled.SortByTextIcon>
                <Styled.ArrowSortByDiv>
                  <Styled.ArrowsForSort onClick={handleAscending}>
                    <Icon type="arrowUp" />
                  </Styled.ArrowsForSort>
                  <Styled.ArrowsForSort onClick={handleDescending}>
                    <Icon type="arrowDown" />
                  </Styled.ArrowsForSort>
                </Styled.ArrowSortByDiv>
              </Styled.SortByDiv>
            </Styled.OptionsDiv>

            <CommonStylesForTables.InnerTableWrapperManageUsers>
              <CommonStylesForTables.Table>
                <CommonStylesForTables.HeaderRowTrainersTable>
                  <CommonStylesForTables.ControlColumn />
                  <CommonStylesForTables.ControlColumn>
                    Edit
                  </CommonStylesForTables.ControlColumn>
                  <HeaderColumn text="Name" />
                  <HeaderColumn text="School  Organisation" />
                  <HeaderColumn text="Registered" />
                  <HeaderColumn text="No. of Games" />
                  <HeaderColumn text="Subscription Expiration" />
                  <HeaderColumn text="Email" isMiddleBox />
                  <HeaderColumn text="Payment" />
                  <HeaderColumn
                    text="Accreditation"
                    color={COLORS.grey}
                    fontColor={COLORS.white}
                  />
                </CommonStylesForTables.HeaderRowTrainersTable>
                {allTrainers.map((item) => {
                  const { fullName, email, organization, registerDate, gap } =
                    renderTrainer(item);

                  return (
                    <Styled.DataRowTrainersTable
                      key={item.id}
                      isSelected={item.isSelected}
                    >
                      <CommonStylesForTables.ControlColumn>
                        <Checkbox
                          isMonoColor
                          label=""
                          onChange={onSelectTrainer(item)}
                          isChecked={Boolean(item.isSelected)}
                          boxWidth={16}
                          boxHeight={16}
                          alignItems="center"
                        />
                      </CommonStylesForTables.ControlColumn>
                      <CommonStylesForTables.ControlColumn>
                        <CommonStylesForTables.ControlWrapper>
                          <Icon type="edit" onClick={editHandler(item.id)} />
                        </CommonStylesForTables.ControlWrapper>
                      </CommonStylesForTables.ControlColumn>
                      <DataColumn text={fullName} />
                      <DataColumn text={organization} />
                      {registerDate === 'pending' ||
                      registerDate === 'registration pending' ? (
                        <DataColumn text={registerDate} isWarning />
                      ) : (
                        <DataColumn text={registerDate} />
                      )}
                      <DataColumn text={gap} />
                      <DataColumn text={gap} />
                      <DataColumn text={email || ''} isMiddleBox />
                      <DataColumn text={gap} />
                      <DataColumn text={gap} />
                    </Styled.DataRowTrainersTable>
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
