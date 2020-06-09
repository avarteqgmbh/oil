import { JS_CLASS_BUTTON_OPTIN } from '../../core/core_constants.js';
import { getLabel, isAdvancedSettings, getLabelWithDefault } from '../userview_config.js';
import { OIL_LABELS } from '../userview_constants.js';
import { AdvancedSettingsButton, YesButton } from './components/oil.buttons.js';
import { formatPurposeId } from './oil.advanced.settings.standard.js';
import { handleSoiOptIn, onOptInComplete, forEach } from './../userview_modal.js';
import { getPurposes } from '../../core/core_vendor_lists';


const PurposeOverviewContainerSnippet = ({id, header, value}) => {
    return `
  <div class="as-oil-cpc__single-purpose-overview">
      <div class="as-oil-cpc__purpose-overview-container">
          <label class="as-oil-cpc__switch purpose-overview-switch">
              <input data-id="${id}" id="as-js-purpose-slider-${id}" class="as-js-purpose-slider" type="checkbox" name="oil-cpc-purpose-${id}" value="${value}"/>
              <span class="as-oil-cpc__slider"></span>
          </label>
          <div class="as-oil-cpc__purpose-header">
            <label for="as-js-purpose-slider-${id}">${header}</label>
          </div>
      </div>
  </div>`
  };

const buildPurposeEntriesOverview = (list) => {
    return list.map(purpose => PurposeOverviewContainerSnippet({
      id: purpose.id,
      header: getLabelWithDefault(`label_cpc_purpose_${formatPurposeId(purpose.id)}_text`, purpose.name || `Error: Missing text for purpose with id ${purpose.id}!`),
      text: '',
      value: false
    })).join('');
  };
  
function activateAndConfirmAll() {
    let elements = document.querySelectorAll('.as-js-purpose-slider');
    forEach(elements, (domNode) => {
        domNode && (domNode.checked = true);
    });
    (handleSoiOptIn()).then(onOptInComplete);
}

export function setupOverviewHandler(){
    forEach(document.querySelectorAll('.as-js-btn-activate-and-confirm-all'), (domNode) => {
        domNode && domNode.addEventListener('click', activateAndConfirmAll, false);
    });
}

export function oilDefaultTemplate() {
    
  return `
    <div class="as-oil-content-overlay" data-qa="oil-full">
        <div class="as-oil-l-wrapper-layout-max-width">
            <div class="as-oil__heading">
                ${getLabel(OIL_LABELS.ATTR_LABEL_INTRO_HEADING)}
            </div>
            <p class="as-oil__intro-txt">
                ${getLabel(OIL_LABELS.ATTR_LABEL_INTRO)}
            </p>
            <div class="as-oil__purposes-overview">
                ${getLabel(OIL_LABELS.ATTR_LABEL_PURPOSES_OVERVIEW)}
                ${buildPurposeEntriesOverview(getPurposes())}
            </div>
            <div class="as-oil-l-row as-oil-l-buttons">
                <div class="as-oil-l-item">
                    <button class="as-js-btn-activate-and-confirm-all as-oil__btn-blue">
                        ${getLabel(OIL_LABELS.ATTR_LABEL_ACTIVATE_AND_CONFIRM_ALL)}
                    </button>
                </div>
                <div class="as-oil-l-item">
                    ${YesButton(`as-oil__btn-optin ${JS_CLASS_BUTTON_OPTIN}`)}
                </div>
                <div class="as-oil-l-item as-oil-l-item--stretch">
                    ${AdvancedSettingsButton(isAdvancedSettings())}
                </div>
            </div>

        </div>
    </div>
`
}
