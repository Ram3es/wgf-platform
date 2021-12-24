import { FC } from 'react';

import { Button } from '@components/button';
import { DropBox } from '@components/drop-box';
import { Icon } from '@components/icon';
import { Loader } from '@components/loader';
import { COLORS } from '@styles/colors';
import { InvitationTable } from './components/invitation-table';
import { ResultInvitationTable } from './components/result-invitation-table';

import { useBulkInviteState } from './bulk-invite.state';

import { PROMISES_AREA } from '@constants/promises-area';
import { STRINGS } from '@constants/strings';
import { ROLES } from '@constants/user-roles';
import { SuperAdminCsvSample, TrainerCsvSample } from './bulk-invite.constants';

import { BulkInviteStyled as Styled, InvitationTableCommonStyled } from './bulk-invite.styles';

export const BulkInvite: FC = () => {
  const {
    file,
    inviteCsvData,
    setInviteCsvData,
    isFileUploading,
    cancelUpload,
    uploadFile,
    onHandleFiles,
    isLoading,
    groups,
    isShownResultInvite,
    handleResultTableClose,
    onSubmitInvite,
    user,
  } = useBulkInviteState();

  if (isShownResultInvite) {
    return (
      <Styled.TableWrapper>
        <Styled.Title>{STRINGS.invitation.bulkInvite} RESULTS</Styled.Title>
        <InvitationTableCommonStyled.TableShadow>
          <ResultInvitationTable invitationList={inviteCsvData!} />
          <Button
            title="Return to Bulk Invite"
            onClick={handleResultTableClose}
            color={COLORS.lightBlue}
            iconType="back"
          />
        </InvitationTableCommonStyled.TableShadow>
      </Styled.TableWrapper>
    );
  }

  if (inviteCsvData && file) {
    return (
      <Styled.TableWrapper>
        <Styled.Title>{STRINGS.invitation.bulkInvite}</Styled.Title>
        <Loader area={PROMISES_AREA.bulkInvite}>
          <InvitationTableCommonStyled.TableShadow>
            <InvitationTable
              invitationList={inviteCsvData!}
              setInvitationList={setInviteCsvData}
              groups={groups}
              onSubmit={onSubmitInvite}
              handleCloseTable={handleResultTableClose}
            />
          </InvitationTableCommonStyled.TableShadow>
        </Loader>
      </Styled.TableWrapper>
    );
  }

  if (file) {
    return (
      <Styled.Wrapper>
        <Styled.Title>{STRINGS.invitation.bulkInvite}</Styled.Title>
        <Styled.ContentWrapper>
          <Styled.Content>
            <Styled.FileName>
              <Icon type="file" />
              <span>{file.name}</span>
            </Styled.FileName>
            {isFileUploading ? (
              <>
                <Styled.Progress />
                <Button
                  onClick={cancelUpload}
                  title={STRINGS.button.cancel}
                  minWidth={165}
                  variant="cancel"
                />
              </>
            ) : (
              <>
                <Styled.FileSuccess>
                  <Icon type="selected" />
                  <span>File uploaded successfully</span>
                </Styled.FileSuccess>
                <Button
                  onClick={uploadFile}
                  title={STRINGS.button.uploadFile}
                  color={COLORS.lightBlue}
                  minWidth={165}
                />
              </>
            )}
          </Styled.Content>
        </Styled.ContentWrapper>
      </Styled.Wrapper>
    );
  }

  return (
    <Styled.Wrapper>
      <Styled.Title>{STRINGS.invitation.bulkInvite}</Styled.Title>
      <Styled.DownloadSample>
        <a
          href={
            user.role === ROLES.superAdmin
              ? SuperAdminCsvSample
              : TrainerCsvSample
          }
          download
        >
          Download sample file
        </a>
      </Styled.DownloadSample>
      <Styled.ContentWrapper>
        <DropBox
          onHandleFile={onHandleFiles}
          isFileLoading={isLoading}
          acceptFiles=".csv, text/csv"
        />
      </Styled.ContentWrapper>
    </Styled.Wrapper>
  );
};
