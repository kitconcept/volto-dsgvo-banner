import React, { useState } from 'react';
import { Button, Checkbox, Form, Container } from 'semantic-ui-react';
import cookie from 'react-cookie';
import { useDispatch } from 'react-redux';
import { updateCookieConsent } from '../../actions';

import "../../theme/styles.less"

const CookieBlockView = ({ isEditMode }) => {
  const dispatch = useDispatch();

  const [agreedGoogle, setAgreedGoogle] = useState(
    !!Number(cookie.load('confirm_ga')),
  );
  const [agreedYoutube, setAgreedYoutube] = useState(
    !!Number(cookie.load('confirm_youtube')),
  );
  // const [agreedFacebook, setAgreedFacebook] = useState(
  //   !!Number(cookie.load('confirm_facebook')),
  // );

  const confirmSelection = () => {
    let expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);
    if (agreedGoogle) {
      cookie.save('confirm_ga', 1, {
        path: '/',
        expires: expiryDate,
      });
      window['ga-disable-UA-112268545-1'] = false;
      dispatch(updateCookieConsent({ googleAnalytics: true }));
    } else {
      cookie.save('confirm_ga', 0, {
        path: '/',
        expires: expiryDate,
      });
      window['ga-disable-UA-112268545-1'] = true;
      cookie.remove('_ga');
      cookie.remove('_gat');
      cookie.remove('_gid');
      dispatch(updateCookieConsent({ googleAnalytics: false }));
    }

    // if (agreedFacebook) {
    //   cookie.save('confirm_facebook', 1, {
    //     path: '/',
    //     expires: expiryDate,
    //   });
    //   dispatch(updateCookieConsent({ facebook: true }));
    // } else {
    //   cookie.remove('confirm_facebook');
    //   dispatch(updateCookieConsent({ facebook: false }));
    // }

    if (agreedYoutube) {
      cookie.save('confirm_youtube', 1, {
        path: '/',
        expires: expiryDate,
      });
      dispatch(updateCookieConsent({ youtube: true }));
    } else {
      cookie.remove('confirm_youtube');
      dispatch(updateCookieConsent({ youtube: false }));
    }
    cookie.save('has_seen_cookie_modal', 1, { path: '/' });
  };

  return (
    <div className="cookie-block">
      <Container>
        <Form>
          <Form.Field>
            <Checkbox toggle label="Technisch notwendig" checked disabled />
          </Form.Field>
          <Form.Field>
            <Checkbox
              disabled={isEditMode}
              toggle
              label="Google Analytics"
              onChange={() => setAgreedGoogle(!agreedGoogle)}
              checked={agreedGoogle}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              disabled={isEditMode}
              toggle
              label="Youtube"
              onChange={() => setAgreedYoutube(!agreedYoutube)}
              checked={agreedYoutube}
            />
          </Form.Field>
        </Form>
        <Button.Group>
          <Button className="branded blue" branded onClick={confirmSelection}>
            Speichern
          </Button>
        </Button.Group>
      </Container>
    </div>
  );
};

export default CookieBlockView;
