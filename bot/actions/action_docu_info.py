from typing import Any, Text, Dict, List

from rasa_sdk.events import SlotSet
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.types import DomainDict

import pandas as pd
import os

class ActionDocuInfo(Action):
    def name(self) -> Text:
        self.df: pd.DataFrame = pd.read_csv(os.path.join(os.getcwd(), "./actions/info_docu_date.csv"))
        return "action_docu_info"
    
    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: DomainDict
    ) -> List[Dict[Text, Any]]:
        service_selected = tracker.get_slot("dual_info_service_selected")
        
        if not service_selected:
            dispatcher.utter_message(text="Perdona, parece que no te he entendido correctamente. ¿Podrías repetirlo o intentar expresarlo de otra manera? 🤔😅")
        else:
            
            filter_service = self.df[self.df["service"] == service_selected]
            docu_info = filter_service["docu_info"].values[0]
            docu_info = docu_info.replace("\\n", "\n")
            date_question = filter_service["date_question"].values[0]
            dispatcher.utter_message(text=f"{docu_info}\n{date_question}")
        return []