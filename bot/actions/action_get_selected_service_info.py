from typing import Any, Text, Dict, List

from rasa_sdk.events import SlotSet
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.types import DomainDict

class ActionGetServiceInformation(Action):
    def name(self) -> Text:
        return "action_get_service_selected_info"
    
    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: DomainDict
    ) -> List[Dict[Text, Any]]:
        service_selected = tracker.get_slot("service_selected")
        
        if not service_selected:
            dispatcher.utter_message(text="No se que has seleccionado")
        else:
            dispatcher.utter_message(text=f"Las {service_selected} con una mierda")
            
        return []