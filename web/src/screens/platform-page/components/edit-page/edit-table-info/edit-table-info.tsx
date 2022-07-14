import React, { FC } from 'react';
import { Icon } from '@components/icon';
import { DATE_TIME_OPTIONS } from '@constants/date';
import { CommonStylesForTables } from '@screens/platform-page/platform-page.styles';
import { IResultUser } from '../user-progres-games/user-progres.constants';
import { EditTableInfoRow } from './edit-table-info.constants';
import { EditTableInfoStyles as Styled } from './edit-table-info.styles';

export interface IEditTableProps {
  user: IEditUserProps;
}
export interface IEditUserProps {
  avatar?: string;
  country?: string;
  created: Date;
  email: string;
  firstName: string;
  id: string;
  isSubscriber?: boolean;
  jobStatus?: string;
  lastName: string;
  mobileNumber?: string;
  occupation?: string;
  organizationName?: string;
  role: string;
  groups?: string;
  results?: IResultUser[];
}

type K = keyof IEditUserProps;

export const EditTableInfo: FC<IEditTableProps> = ({ user }) => {
  return (
    <Styled.TableWrapper>
      <CommonStylesForTables.TableWrapperUsers>
        <Styled.TableShadow>
          {EditTableInfoRow[user.role].map((title) => {
            const key = Object.keys(title).join(' ') as K;
            let value = user[key];

            if (typeof value === 'undefined') {
              value = ' - ';
            }
            if (key === 'created') {
              value = new Date(user[key]).toLocaleString(
                'en-US',
                DATE_TIME_OPTIONS
              );
            }
            return (
              <React.Fragment key={key}>
                <Styled.RowWrapper>
                  <Styled.Text>{title[key]}</Styled.Text>
                  <Styled.TextBold>{value}</Styled.TextBold>
                </Styled.RowWrapper>
              </React.Fragment>
            );
          })}
          {user.role === 'trainerAdmin' &&
            EditTableInfoRow.editRow.map((title) => {
              const key = Object.keys(title).join(' ') as K;
              return (
                <React.Fragment key={key}>
                  <Styled.RowWrapper>
                    <Styled.Text> {title[key]}</Styled.Text>
                    <Styled.TextBold>{user[key] || key} </Styled.TextBold>
                    <Icon type="edit" />
                    <Styled.IconWrapper></Styled.IconWrapper>
                  </Styled.RowWrapper>
                </React.Fragment>
              );
            })}
        </Styled.TableShadow>
      </CommonStylesForTables.TableWrapperUsers>
    </Styled.TableWrapper>
  );
};
