import React, { FunctionComponent, SVGProps } from 'react';

import { ReactComponent as arrowBottom } from '@assets/img/arrow-bottom.svg';
import { ReactComponent as arrowDownload } from '@assets/img/arrow-download.svg';
import { ReactComponent as arrowDown } from '@assets/img/arrow-sort-by-down.svg';
import { ReactComponent as arrowUp } from '@assets/img/arrow-sort-by-up.svg';
import { ReactComponent as back } from '@assets/img/back-arrow.svg';
import { ReactComponent as bin } from '@assets/img/bin.svg';
import { ReactComponent as bulkInvite } from '@assets/img/bulk-invite.svg';
import { ReactComponent as check } from '@assets/img/check.svg';
import { ReactComponent as Dashboard } from '@assets/img/dashboard.svg';
import { ReactComponent as disconnect } from '@assets/img/disconnect.svg';
import { ReactComponent as dropBox } from '@assets/img/drop-box.svg';
import { ReactComponent as edit } from '@assets/img/edit.svg';
import { ReactComponent as envelopeCancel } from '@assets/img/envelope-cancel.svg';
import { ReactComponent as envelopeReminder } from '@assets/img/envelope-reminder.svg';
import { ReactComponent as eyeBlocked } from '@assets/img/eye-blocked.svg';
import { ReactComponent as eye } from '@assets/img/eye.svg';
import { ReactComponent as facebook } from '@assets/img/facebook-icon.svg';
import { ReactComponent as file } from '@assets/img/file.svg';
import { ReactComponent as google } from '@assets/img/google-icon.svg';
import { ReactComponent as History } from '@assets/img/history.svg';
import { ReactComponent as imagesPicker } from '@assets/img/images-picker.svg';
import { ReactComponent as inviteUsers } from '@assets/img/invite-users.svg';
import { ReactComponent as invite } from '@assets/img/invite.svg';
import { ReactComponent as line } from '@assets/img/line.svg';
import { ReactComponent as linkedin } from '@assets/img/linkedin-icon.svg';
import { ReactComponent as logout } from '@assets/img/logout.svg';
import { ReactComponent as manageGroup } from '@assets/img/manage-group.svg';
import { ReactComponent as manageTrainers } from '@assets/img/manage-trainers.svg';
import { ReactComponent as manageUsersIcon } from '@assets/img/manage-users-icon.svg';
import { ReactComponent as manageUsers } from '@assets/img/manage-users.svg';
import { ReactComponent as microsoft } from '@assets/img/microsoft-icon.svg';
import { ReactComponent as next } from '@assets/img/next-arrow.svg';
import { ReactComponent as options } from '@assets/img/options.svg';
import { ReactComponent as Profile } from '@assets/img/profile.svg';
import { ReactComponent as question } from '@assets/img/question-icon.svg';
import { ReactComponent as requestTrainer } from '@assets/img/request-trainer.svg';
import { ReactComponent as search } from '@assets/img/search.svg';
import { ReactComponent as selected } from '@assets/img/selected.svg';
import { ReactComponent as shape } from '@assets/img/shape.svg';
import { ReactComponent as submitPhoto } from '@assets/img/submit-photo.svg';
import { ReactComponent as Trainer } from '@assets/img/trainer.svg';
import { ReactComponent as triangle } from '@assets/img/triangle.svg';
import { ReactComponent as triangleBreacket } from '@assets/img/bread-crumb-path.svg';

const ICONS: Record<string, FunctionComponent<SVGProps<SVGSVGElement>>> = {
  Dashboard,
  Profile,
  History,
  Trainer,
  ['Invite Users/Trainers']: inviteUsers,
  ['Invite Users']: inviteUsers,
  ['Manage Trainers']: manageTrainers,
  ['Manage Users']: manageUsers,
  ['Manage Group']: manageGroup,
  imagesPicker,
  submitPhoto,
  edit,
  selected,
  arrowBottom,
  arrowDownload,
  logout,
  check,
  question,
  shape,
  file,
  options,
  disconnect,
  requestTrainer,
  invite,
  dropBox,
  next,
  back,
  google,
  facebook,
  linkedin,
  microsoft,
  bin,
  bulkInvite,
  manageUsersIcon,
  line,
  envelopeReminder,
  envelopeCancel,
  arrowUp,
  arrowDown,
  triangle,
  search,
  eye,
  eyeBlocked,
  triangleBreacket,
};

export const Icon = (props: { type: string }) => {
  const NewIcon = ICONS[props.type];

  if (!NewIcon) {
    return null;
  }

  return <NewIcon />;
};
