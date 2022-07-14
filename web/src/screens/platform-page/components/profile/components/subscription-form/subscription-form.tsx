import {
  SubscriptionItems,
  subscriptionLabels,
} from './subscription-form.constants';
import { ProfileSectionFormStyles as Styled } from '../../profile.styles';
import { TextField } from '@components/text-field';

export const SubscriptionForm: React.FC = () => {
  return (
    <>
      {SubscriptionItems.map((item, index) => {
        return (
          <Styled.FormWrapper key={index}>
            <Styled.FormItem type="text">
              <TextField
                type="text"
                name={item}
                placeholder=""
                value={''}
                label={subscriptionLabels[item]}
                withBorder
                height="38px"
                isReadOnly
              />
            </Styled.FormItem>
          </Styled.FormWrapper>
        );
      })}
    </>
  );
};
