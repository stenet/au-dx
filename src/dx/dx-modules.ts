declare var require: any;

var DevExpress = require("devextreme/bundles/modules/core");

require("devextreme/events/click");
require("devextreme/events/contextmenu");
require("devextreme/events/double_click");
require("devextreme/events/drag");
require("devextreme/events/hold");
require("devextreme/events/hover");
require("devextreme/events/pointer");
require("devextreme/events/swipe");
require("devextreme/events/transform");

const result: any = {};

result.data = DevExpress.data = require("devextreme/bundles/modules/data");
result.ui = DevExpress.ui = require("devextreme/bundles/modules/ui");
result.themes = require("devextreme/ui/themes");
result.setTemplateEngine = require("devextreme/ui/set_template_engine");
result.dialog = require("devextreme/ui/dialog");
result.notify = require("devextreme/ui/notify");

DevExpress.ui.dialog = result.dialog;
DevExpress.ui.notify = result.notify;

DevExpress.integration = {
  date: require("devextreme/localization/date")
};

/* Base widgets (dx.module-widgets-base.js) */
result.dxActionSheet = require("devextreme/ui/action_sheet");
result.dxAutocomplete = require("devextreme/ui/autocomplete");
result.dxBox = require("devextreme/ui/box");
result.dxButton = require("devextreme/ui/button");
result.dxCalendar = require("devextreme/ui/calendar");
result.dxCheckBox = require("devextreme/ui/check_box");
result.dxColorBox = require("devextreme/ui/color_box");
result.dxDateBox = require("devextreme/ui/date_box");
result.dxDeferRendering = require("devextreme/ui/defer_rendering");
result.dxDropDownMenu = require("devextreme/ui/drop_down_menu");
result.dxFileUploader = require("devextreme/ui/file_uploader");
result.dxFilterBuilder = require("devextreme/ui/filter_builder");
result.dxForm = require("devextreme/ui/form");
result.dxGallery = require("devextreme/ui/gallery");
result.dxHtmlEditor = require("devextreme/ui/html_editor");
result.dxList = require("devextreme/ui/list");
result.dxLoadIndicator = require("devextreme/ui/load_indicator");
result.dxLoadPanel = require("devextreme/ui/load_panel");
result.dxLookup = require("devextreme/ui/lookup");
result.dxMap = require("devextreme/ui/map");
result.dxMultiView = require("devextreme/ui/multi_view");
result.dxNavBar = require("devextreme/ui/nav_bar");
result.dxNumberBox = require("devextreme/ui/number_box");
result.dxOverlay = require("devextreme/ui/overlay");
result.dxPopover = require("devextreme/ui/popover");
result.dxPopup = require("devextreme/ui/popup");
result.dxProgressBar = require("devextreme/ui/progress_bar");
result.dxRadioGroup = require("devextreme/ui/radio_group");
result.dxRangeSlider = require("devextreme/ui/range_slider");
result.dxResizable = require("devextreme/ui/resizable");
result.dxResponsiveBox = require("devextreme/ui/responsive_box");
result.dxScrollView = require("devextreme/ui/scroll_view");
result.dxSelectBox = require("devextreme/ui/select_box");
result.dxSlider = require("devextreme/ui/slider");
result.dxSwitch = require("devextreme/ui/switch");
result.dxTabPanel = require("devextreme/ui/tab_panel");
result.dxTabs = require("devextreme/ui/tabs");
result.dxTagBox = require("devextreme/ui/tag_box");
result.dxTextArea = require("devextreme/ui/text_area");
result.dxTextBox = require("devextreme/ui/text_box");
result.dxDropDownBox = require("devextreme/ui/drop_down_box");
result.dxTileView = require("devextreme/ui/tile_view");
result.dxToast = require("devextreme/ui/toast");
result.dxToolbar = require("devextreme/ui/toolbar");
result.dxTooltip = require("devextreme/ui/tooltip");
result.dxTrackBar = require("devextreme/ui/track_bar");

/* Validation (dx.module-widgets-base.js) */
DevExpress.validationEngine = require("devextreme/ui/validation_engine");
result.dxValidationSummary = require("devextreme/ui/validation_summary");
result.dxValidationGroup = require("devextreme/ui/validation_group");
result.dxValidator = require("devextreme/ui/validator");

/* Web widgets (dx.module-widgets-web.js) */
result.dxAccordion = require("devextreme/ui/accordion");
result.dxContextMenu = require("devextreme/ui/context_menu");
result.dxDataGrid = require("devextreme/ui/data_grid");
result.dxMenu = require("devextreme/ui/menu");
result.dxPivotGrid = require("devextreme/ui/pivot_grid");
result.dxPivotGridFieldChooser = require("devextreme/ui/pivot_grid_field_chooser");
result.PivotGridDataSource = require("devextreme/ui/pivot_grid/data_source");
result.XmlaStore = require("devextreme/ui/pivot_grid/xmla_store");
result.dxScheduler = require("devextreme/ui/scheduler");
result.dxTreeView = require("devextreme/ui/tree_view");
result.dxTreeList = require("devextreme/ui/tree_list");

/* Viz core (dx.module-viz-core.js) */
result.viz = DevExpress.viz = require("devextreme/bundles/modules/viz");
result.currentTheme = require("devextreme/viz/themes").currentTheme;
result.registerTheme = require("devextreme/viz/themes").registerTheme;
result.exportFromMarkup = require("devextreme/viz/export").exportFromMarkup;
result.currentPalette = require("devextreme/viz/palette").currentPalette;
result.getPalette = require("devextreme/viz/palette").getPalette;
result.registerPalette = require("devextreme/viz/palette").registerPalette;

/* Charts (dx.module-viz-charts.js) */
result.dxChart = require("devextreme/viz/chart");
result.dxPieChart = require("devextreme/viz/pie_chart");
result.dxPolarChart = require("devextreme/viz/polar_chart");
result.dxLinearGauge = require("devextreme/viz/linear_gauge");
result.dxCircularGauge = require("devextreme/viz/circular_gauge");
result.dxFunnel = require("devextreme/viz/funnel");
result.dxBarGauge = require("devextreme/viz/bar_gauge");

/* Range selector (dx.module-viz-rangeselector.js) */
result.dxRangeSelector = require("devextreme/viz/range_selector");

/* Vector map (dx.module-viz-vectormap.js) */
result.dxVectorMap = require("devextreme/viz/vector_map");
result.map = {};
result.map.sources = {};
result.map.projection = require("devextreme/viz/vector_map/projection").projection;

/* Sparklines (dx.module-viz-sparklines.js) */
result.dxSparkline = require("devextreme/viz/sparkline");
result.dxBullet = require("devextreme/viz/bullet");

export default result;