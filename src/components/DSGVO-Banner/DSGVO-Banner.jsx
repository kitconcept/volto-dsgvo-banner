import React, { useState } from 'react';
import { Button, Modal, Checkbox, Form } from 'semantic-ui-react';
import cookie from 'react-cookie';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateCookieConsent } from '../../actions';

const CookieModal = (props) => {
  const privacy_url = '/datenschutz';
  const dispatch = useDispatch();

  const [configureCookies, setConfigureCookies] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(
    !!!Number(cookie.load('has_seen_cookie_modal')),
  );
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
    setShowConfirmModal(false);
  };

  const confirmAll = () => {
    let expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);

    cookie.save('confirm_ga', 1, {
      path: '/',
      expires: expiryDate,
    });
    window['ga-disable-UA-112268545-1'] = false;

    cookie.save('confirm_facebook', 1, {
      path: '/',
      expires: expiryDate,
    });

    cookie.save('confirm_youtube', 1, {
      path: '/',
      expires: expiryDate,
    });

    setShowConfirmModal(false);
    cookie.save('has_seen_cookie_modal', 1, {
      path: '/',
      expires: expiryDate,
    });

    dispatch(
      updateCookieConsent({
        googleAnalytics: true,
        facebook: true,
        youtube: true,
      }),
    );
  };

  return (
    <>
      <Modal
        id="question-landing"
        open={showConfirmModal}
        dimmer="inverted"
        closeOnDimmerClick={false}
        className="cookie-modal"
      >
        {!configureCookies ? (
          <>
            <Modal.Content>
              <h2>Datenschutzhinweis</h2>

              <p className="cookie-text">
                Um Ihnen die bestmögliche Nutzererfahrung zu ermöglichen,
                verwenden wir auf unserer Webseite Cookies. Für den Betrieb der
                Seite notwendige Cookies werden automatisch gesetzt. Darüber
                hinaus können Sie weitere Cookies zulassen. Sie können{' '}
                <b>allen Cookies zustimmen</b> oder die{' '}
                <b>Datenschutzeinstellungen anpassen</b>. <br />
                Zur{' '}
                <b>
                  <Link
                    to={privacy_url}
                    onClick={() => setShowConfirmModal(false)}
                  >
                    Datenschutzerklärung
                  </Link>
                </b>
                .
              </p>
            </Modal.Content>
            <Modal.Actions>
              <Button className="branded olive" onClick={() => confirmAll()}>
                Allen Cookies zustimmen
              </Button>
              <Button
                className="branded blue inverted"
                branded
                onClick={() => setConfigureCookies(true)}
              >
                Datenschutzeinstellungen anpassen
              </Button>
            </Modal.Actions>
          </>
        ) : (
          <>
            <Modal.Content>
              <h2>Datenschutzhinweis</h2>
              <Form>
                <Form.Field>
                  <Checkbox
                    toggle
                    label="Technisch notwendig"
                    checked
                    disabled
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    toggle
                    label="Tracking"
                    onChange={() => setAgreedGoogle(!agreedGoogle)}
                    checked={agreedGoogle}
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    toggle
                    label="Youtube"
                    onChange={() => setAgreedYoutube(!agreedYoutube)}
                    checked={agreedYoutube}
                  />
                </Form.Field>
                {/* <Form.Field>
                  <Checkbox
                    toggle
                    label="Facebook"
                    onChange={() => setAgreedFacebook(!agreedFacebook)}
                    checked={agreedFacebook}
                  />
                </Form.Field> */}
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button
                className="back"
                onClick={() => setConfigureCookies(false)}
              >
                {'< Zurück'}
              </Button>
              <Button className="branded olive" onClick={() => confirmAll()}>
                Allen Cookies zustimmen
              </Button>
              <Button
                className="branded blue"
                branded
                onClick={confirmSelection}
              >
                Speichern
              </Button>
            </Modal.Actions>
          </>
        )}
      </Modal>
    </>
  );
};

export default CookieModal;
